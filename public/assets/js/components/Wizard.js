/**
 * Wizard Component v1.0
 * Componente reutilizable para formularios multi-paso
 * Basado en el wizard del hero de Vinilone
 */

class Wizard {
    /**
     * @param {Object} config - Configuración del wizard
     * @param {string} config.containerId - ID del contenedor del wizard
     * @param {string} config.prefix - Prefijo para IDs de elementos (ej: 'calc' o 'cta')
     * @param {Object} config.selectors - Selectores personalizados (opcional)
     * @param {Object} config.callbacks - Callbacks para eventos (opcional)
     * @param {Object} config.whatsapp - Configuración de WhatsApp
     */
    constructor(config) {
        this.config = {
            containerId: config.containerId,
            prefix: config.prefix || '',
            whatsapp: config.whatsapp || { phone: '34600000000', baseUrl: 'https://wa.me/' },
            provincesUrl: config.provincesUrl || 'assets/data/provinces.json',
            callbacks: config.callbacks || {},
            totalSteps: config.totalSteps || 4,
            ...config
        };

        this.state = {
            step: 1,
            province: '',
            municipality: '',
            windows: { grande: 0, mediana: 0, pequena: 0, otro: 0 },
            model: '',
            name: '',
            phone: '',
            phonePrefix: '+34'
        };

        this.elements = {};
        this.provincesLoaded = false;

        this._init();
    }

    /**
     * Inicializa el wizard
     */
    _init() {
        this._cacheElements();
        this._bindEvents();
        this._loadProvinces();
        this._validateCurrentStep();
    }

    /**
     * Cachea elementos del DOM
     */
    _cacheElements() {
        const p = this.config.prefix;

        // Función helper para obtener elemento por ID con múltiples variantes
        const getEl = (...ids) => {
            for (const id of ids) {
                const el = document.getElementById(id);
                if (el) return el;
            }
            return null;
        };

        this.container = document.getElementById(this.config.containerId);
        if (!this.container) {
            console.warn(`Wizard: Container #${this.config.containerId} not found`);
            return;
        }

        // Determinar patrón de IDs según el prefijo
        // Ahora usamos siempre el prefijo (default 'hero' si no se pasa, o lo que venga en config.prefix)
        const prefix = this.config.prefix || 'hero';

        this.elements = {
            // Steps
            steps: this.container.querySelectorAll('[data-wizard-step]'),

            // Step 1 - Ubicación
            province: getEl(`${prefix}-province`),
            municipality: getEl(`${prefix}-municipality`),
            munGroup: getEl(`${prefix}-group-municipality`),
            btnStep1: getEl(`${prefix}-btn-step-1`),

            // Step 2 - Ventanas
            btnStep2: getEl(`${prefix}-btn-step-2`),
            displays: {
                grande: getEl(`${prefix}-count-grande`),
                mediana: getEl(`${prefix}-count-mediana`),
                pequena: getEl(`${prefix}-count-pequena`),
                otro: getEl(`${prefix}-count-otro`)
            },

            // Step 3 - Modelo
            btnStep3: getEl(`${prefix}-btn-step-3`),
            modelCards: this.container.querySelectorAll('[data-model]'),

            // Step 4 - Contacto
            name: getEl(`${prefix}-name`),
            phone: getEl(`${prefix}-phone`),
            phonePrefix: getEl(`${prefix}-prefix`),
            btnWhatsapp: getEl(`${prefix}-btn-submit-whatsapp`),

            // Accessibility
            announcer: getEl(`${prefix}-wizard-announcer`),
            progress: getEl('wizard-progress'), // Este parece no estar prefijado en el HTML original, verificar si se usa
            breadcrumb: this.container.querySelector('[data-wizard-breadcrumb]') ||
                getEl(`${prefix}-wizard-breadcrumb`)
        };
    }

    /**
     * Vincula eventos
     */
    _bindEvents() {
        if (!this.container) return;

        // Delegación de eventos en el contenedor
        this.container.addEventListener('click', (e) => this._handleClick(e));
        this.container.addEventListener('change', (e) => this._handleChange(e));
        this.container.addEventListener('input', (e) => this._handleInput(e));
        this.container.addEventListener('keydown', (e) => this._handleKeydown(e));
    }

    /**
     * Maneja clicks delegados
     */
    _handleClick(e) {
        const target = e.target;

        // Botones de navegación
        const actionBtn = target.closest('[data-action]');
        if (actionBtn) {
            const action = actionBtn.dataset.action;
            if (action === 'next-step') this.nextStep();
            if (action === 'prev-step') this.prevStep();
        }

        // Contadores de ventanas
        const counterBtn = target.closest('[data-window]');
        if (counterBtn) {
            const type = counterBtn.dataset.window;
            const value = parseInt(counterBtn.dataset.value, 10);
            if (type && !isNaN(value)) this.updateCounter(type, value);
        }

        // Selección de modelo
        const modelCard = target.closest('[data-model]');
        if (modelCard) {
            this.selectModel(modelCard);
        }

        // WhatsApp submit
        if (target.closest('[data-action="submit-whatsapp"]') ||
            target.closest(`#${this.config.prefix}-btn-submit-whatsapp`)) {
            this.handleWhatsappSubmit();
        }

        // Breadcrumb navigation
        const breadcrumbStep = target.closest('[data-step]');
        if (breadcrumbStep && !breadcrumbStep.disabled) {
            const targetStep = parseInt(breadcrumbStep.dataset.step, 10);
            if (targetStep < this.state.step) {
                this.goToStep(targetStep);
            }
        }
    }

    /**
     * Maneja cambios en selects
     */
    _handleChange(e) {
        if (e.target === this.elements.province) {
            this.state.province = e.target.value;
            this._showMunicipalityField();
            this._validateStep(1);
        }
        if (e.target === this.elements.phonePrefix) {
            this.state.phonePrefix = e.target.value;
        }
    }

    /**
     * Maneja inputs
     */
    _handleInput(e) {
        if (e.target === this.elements.municipality) {
            this.state.municipality = e.target.value;
            this._validateStep(1);
        }
        if (e.target === this.elements.name) {
            this.state.name = e.target.value;
        }
        if (e.target === this.elements.phone) {
            this.state.phone = e.target.value;
        }
    }

    /**
     * Maneja eventos de teclado
     */
    _handleKeydown(e) {
        // Selección de modelo con Enter/Space
        if ((e.key === 'Enter' || e.key === ' ') && e.target.closest('[data-model]')) {
            e.preventDefault();
            this.selectModel(e.target.closest('[data-model]'));
        }
    }

    /**
     * Carga las provincias desde JSON
     */
    async _loadProvinces() {
        if (this.provincesLoaded || !this.elements.province) return;

        try {
            const response = await fetch(this.config.provincesUrl);
            if (!response.ok) throw new Error('Error cargando provincias');

            const data = await response.json();
            const fragment = document.createDocumentFragment();

            data.provinces.forEach(province => {
                const option = document.createElement('option');
                option.value = province;
                option.textContent = province;
                fragment.appendChild(option);
            });

            this.elements.province.appendChild(fragment);
            this.provincesLoaded = true;

            // Callback
            if (this.config.callbacks.onProvincesLoaded) {
                this.config.callbacks.onProvincesLoaded();
            }
        } catch (error) {
            console.error('Error al cargar provincias:', error);
            this._showToast('Error al cargar provincias', 'error');
        }
    }

    /**
     * Muestra el campo de municipio
     */
    _showMunicipalityField() {
        if (this.elements.munGroup && this.state.province) {
            this.elements.munGroup.classList.remove('hidden');
            setTimeout(() => this.elements.munGroup.classList.remove('opacity-0'), 50);
        }
    }

    /**
     * Navega al paso siguiente
     */
    nextStep() {
        if (!this._canProceed(this.state.step)) return;
        this.goToStep(this.state.step + 1);
    }

    /**
     * Navega al paso anterior
     */
    prevStep() {
        if (this.state.step > 1) {
            this.goToStep(this.state.step - 1);
        }
    }

    /**
     * Navega a un paso específico
     * @param {number} stepNumber - Número del paso
     */
    goToStep(stepNumber) {
        if (stepNumber < 1 || stepNumber > this.config.totalSteps) return;

        const previousStep = this.state.step;
        const isForward = stepNumber > previousStep;

        // Ocultar todos los pasos
        this.elements.steps.forEach(el => el.classList.add('hidden'));

        // Mostrar paso destino
        const target = this.container.querySelector(`[data-wizard-step="${stepNumber}"]`) ||
            document.getElementById(`step-${stepNumber}`);

        if (target) {
            target.classList.remove('hidden');

            // Animación direccional
            target.classList.remove('animate-fade-in', 'animate-slide-in-right', 'animate-slide-in-left');
            void target.offsetWidth; // Force reflow
            const animationClass = isForward ? 'animate-slide-in-right' : 'animate-slide-in-left';
            target.classList.add(animationClass);

            // Focus en primer elemento interactivo
            setTimeout(() => {
                const focusable = target.querySelector('input:not([disabled]), select:not([disabled]), button:not([disabled])');
                if (focusable) focusable.focus();
            }, 100);
        }

        this.state.step = stepNumber;

        // Actualizar UI
        this._updateProgress(stepNumber);
        this._updateBreadcrumb(stepNumber);
        this._announce(`Paso ${stepNumber} de ${this.config.totalSteps}`);

        // Callbacks
        if (this.config.callbacks.onStepChange) {
            this.config.callbacks.onStepChange(stepNumber, previousStep);
        }

        // Recrear iconos Lucide
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    /**
     * Actualiza el contador de ventanas
     * @param {string} type - Tipo de ventana
     * @param {number} change - Cambio (+1/-1)
     */
    updateCounter(type, change) {
        const current = this.state.windows[type] || 0;
        const newValue = Math.max(0, current + change);
        this.state.windows[type] = newValue;

        const display = this.elements.displays[type];
        if (display) {
            display.textContent = newValue;
            // Animación
            display.classList.remove('animate-bounce-subtle');
            void display.offsetWidth;
            display.classList.add('animate-bounce-subtle');
            setTimeout(() => display.classList.remove('animate-bounce-subtle'), 400);
        }

        this._validateStep(2);
    }

    /**
     * Selecciona un modelo
     * @param {HTMLElement} card - Tarjeta del modelo
     */
    selectModel(card) {
        // Deseleccionar todos
        this.elements.modelCards.forEach(c => {
            c.classList.remove('selected', 'ring-2', 'ring-brand-500');
            c.setAttribute('aria-pressed', 'false');
            const checkIcon = c.querySelector('.check-icon');
            if (checkIcon) {
                checkIcon.classList.remove('opacity-100', 'scale-100', 'animate-checkmark-pop');
            }
        });

        // Seleccionar actual
        card.classList.add('selected', 'ring-2', 'ring-brand-500');
        card.setAttribute('aria-pressed', 'true');

        const checkIcon = card.querySelector('.check-icon');
        if (checkIcon) {
            checkIcon.classList.add('opacity-100', 'scale-100', 'animate-checkmark-pop');
        }

        this.state.model = card.dataset.model;
        this._validateStep(3);
        this._announce(`Modelo ${card.dataset.model} seleccionado`);
    }

    /**
     * Envía a WhatsApp
     */
    handleWhatsappSubmit() {
        // Actualizar estado con valores actuales
        this.state.name = this.elements.name?.value || '';
        this.state.phone = this.elements.phone?.value || '';

        if (!this._canProceed(4)) return;

        const message = this._generateWhatsappMessage();
        window.open(`${this.config.whatsapp.baseUrl}${this.config.whatsapp.phone}?text=${message}`, '_blank');

        // Callback
        if (this.config.callbacks.onSubmit) {
            this.config.callbacks.onSubmit(this.state);
        }
    }

    /**
     * Genera el mensaje de WhatsApp
     * @returns {string}
     */
    _generateWhatsappMessage() {
        const w = this.state;
        return `Hola Vinilone! 👋 Quiero presupuesto:%0A%0A` +
            `📍 *Ubicación:* ${w.municipality} (${w.province})%0A` +
            `🪟 *Ventanas:*%0A` +
            `   - Grandes: ${w.windows.grande}%0A` +
            `   - Medianas: ${w.windows.mediana}%0A` +
            `   - Pequeñas: ${w.windows.pequena}%0A` +
            `   - Otras: ${w.windows.otro}%0A` +
            `☀️ *Modelo:* ${w.model.toUpperCase()}%0A%0A` +
            `Soy ${w.name}. Gracias!`;
    }

    /**
     * Valida el paso actual
     */
    _validateCurrentStep() {
        this._validateStep(this.state.step);
    }

    /**
     * Valida un paso específico
     * @param {number} step - Número del paso
     * @returns {boolean}
     */
    _validateStep(step) {
        let isValid = false;
        let button = null;

        switch (step) {
            case 1:
                isValid = this.state.province !== '' &&
                    this.state.municipality.trim().length >= 2;
                button = this.elements.btnStep1;
                break;
            case 2:
                isValid = Object.values(this.state.windows).reduce((a, b) => a + b, 0) > 0;
                button = this.elements.btnStep2;
                break;
            case 3:
                isValid = this.state.model !== '';
                button = this.elements.btnStep3;
                break;
            case 4:
                isValid = this.state.name.trim().length >= 2 &&
                    this.state.phone.trim().length >= 6;
                button = this.elements.btnWhatsapp;
                break;
        }

        if (button) {
            this._updateButtonState(button, isValid);
        }

        return isValid;
    }

    /**
     * Verifica si puede avanzar al siguiente paso
     * @param {number} step - Paso actual
     * @returns {boolean}
     */
    _canProceed(step) {
        // Sincronizar estado antes de validar
        if (step === 1) {
            this.state.province = this.elements.province?.value || '';
            this.state.municipality = this.elements.municipality?.value || '';
        }

        const isValid = this._validateStep(step);

        if (!isValid) {
            const messages = {
                1: 'Por favor, completa tu ubicación.',
                2: 'Añade al menos una ventana.',
                3: 'Debes seleccionar un modelo.',
                4: 'Por favor, introduce nombre y teléfono.'
            };
            this._showToast(messages[step], 'error');
            this._announce(messages[step]);
        }

        return isValid;
    }

    /**
     * Actualiza el estado de un botón
     * @param {HTMLElement} button - Botón
     * @param {boolean} enabled - Si está habilitado
     */
    _updateButtonState(button, enabled) {
        if (!button) return;

        const wasDisabled = button.hasAttribute('disabled');

        if (enabled) {
            button.removeAttribute('disabled');
            button.classList.remove('btn-disabled');

            if (wasDisabled) {
                button.classList.add('animate-pulse-success');
                setTimeout(() => button.classList.remove('animate-pulse-success'), 600);
            }
        } else {
            button.setAttribute('disabled', 'true');
            button.classList.add('btn-disabled');
        }
    }

    /**
     * Actualiza el indicador de progreso
     * @param {number} step - Paso actual
     */
    _updateProgress(step) {
        if (this.elements.progress) {
            this.elements.progress.setAttribute('aria-valuenow', step);
            this.elements.progress.setAttribute('aria-label',
                `Progreso del formulario: paso ${step} de ${this.config.totalSteps}`);
        }
    }

    /**
     * Actualiza el breadcrumb visual
     * @param {number} currentStep - Paso actual
     */
    _updateBreadcrumb(currentStep) {
        const breadcrumb = this.elements.breadcrumb;
        if (!breadcrumb) return;

        const steps = breadcrumb.querySelectorAll('.breadcrumb-step, [data-step]');
        const lines = breadcrumb.querySelectorAll('.breadcrumb-line');

        steps.forEach((stepEl, index) => {
            const stepNum = index + 1;
            stepEl.classList.remove('active', 'completed');
            stepEl.removeAttribute('aria-current');

            if (stepNum < currentStep) {
                stepEl.classList.add('completed');
                stepEl.removeAttribute('disabled');
            } else if (stepNum === currentStep) {
                stepEl.classList.add('active');
                stepEl.setAttribute('aria-current', 'step');
                stepEl.removeAttribute('disabled');
            } else {
                stepEl.setAttribute('disabled', 'true');
            }
        });

        lines.forEach((line, index) => {
            if (index < currentStep - 1) {
                line.classList.add('active');
            } else {
                line.classList.remove('active');
            }
        });
    }

    /**
     * Anuncia mensaje para screen readers
     * @param {string} message - Mensaje
     */
    _announce(message) {
        if (this.elements.announcer) {
            this.elements.announcer.textContent = message;
        }
    }

    /**
     * Muestra un toast
     * @param {string} message - Mensaje
     * @param {string} type - Tipo ('default' | 'error')
     */
    _showToast(message, type = 'default') {
        // Usar función global si existe
        if (typeof window.showToast === 'function') {
            window.showToast(message, type);
            return;
        }

        // Fallback: crear toast inline
        let container = document.getElementById('toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toast-container';
            container.className = 'fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none';
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        const bgColor = type === 'error' ? 'bg-red-500' : 'bg-azure-900';

        toast.className = `${bgColor} text-white px-6 py-3 rounded-xl shadow-2xl transform transition-all duration-300 translate-x-full opacity-0 flex items-center gap-3 pointer-events-auto`;
        toast.innerHTML = `<span class="font-medium">${message}</span>`;

        container.appendChild(toast);

        requestAnimationFrame(() => toast.classList.remove('translate-x-full', 'opacity-0'));
        setTimeout(() => {
            toast.classList.add('opacity-0', 'translate-y-2');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    /**
     * Obtiene el estado actual
     * @returns {Object}
     */
    getState() {
        return { ...this.state };
    }

    /**
     * Establece el estado
     * @param {Object} newState - Nuevo estado
     */
    setState(newState) {
        Object.assign(this.state, newState);
        this._syncUIWithState();
    }

    /**
     * Sincroniza la UI con el estado interno
     */
    _syncUIWithState() {
        // Sincronizar inputs
        if (this.elements.province && this.state.province) {
            this.elements.province.value = this.state.province;
            this._showMunicipalityField();
        }
        if (this.elements.municipality) {
            this.elements.municipality.value = this.state.municipality;
        }
        if (this.elements.name) {
            this.elements.name.value = this.state.name;
        }
        if (this.elements.phone) {
            this.elements.phone.value = this.state.phone;
        }

        // Sincronizar contadores
        Object.entries(this.state.windows).forEach(([type, count]) => {
            const display = this.elements.displays[type];
            if (display) display.textContent = count;
        });

        // Sincronizar modelo
        if (this.state.model) {
            const modelCard = this.container.querySelector(`[data-model="${this.state.model}"]`);
            if (modelCard) this.selectModel(modelCard);
        }

        // Validar paso actual
        this._validateCurrentStep();
    }

    /**
     * Resetea el wizard
     */
    reset() {
        this.state = {
            step: 1,
            province: '',
            municipality: '',
            windows: { grande: 0, mediana: 0, pequena: 0, otro: 0 },
            model: '',
            name: '',
            phone: '',
            phonePrefix: '+34'
        };

        // Resetear UI
        if (this.elements.province) this.elements.province.value = '';
        if (this.elements.municipality) this.elements.municipality.value = '';
        if (this.elements.munGroup) {
            this.elements.munGroup.classList.add('hidden', 'opacity-0');
        }
        if (this.elements.name) this.elements.name.value = '';
        if (this.elements.phone) this.elements.phone.value = '';

        Object.values(this.elements.displays).forEach(display => {
            if (display) display.textContent = '0';
        });

        this.elements.modelCards.forEach(card => {
            card.classList.remove('selected', 'ring-2', 'ring-brand-500');
            card.setAttribute('aria-pressed', 'false');
        });

        this.goToStep(1);
    }

    /**
     * Destruye la instancia del wizard
     */
    destroy() {
        if (this.container) {
            this.container.removeEventListener('click', this._handleClick);
            this.container.removeEventListener('change', this._handleChange);
            this.container.removeEventListener('input', this._handleInput);
            this.container.removeEventListener('keydown', this._handleKeydown);
        }
        this.elements = {};
    }
}

// Exportar para uso como módulo o global
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Wizard;
} else {
    window.Wizard = Wizard;
}
