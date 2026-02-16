/**
 * Vinilone - Script Principal v3.0
 * Refactorizado con componente Wizard reutilizable
 */

// Vinilone - Script Principal v3.0
// Refactorizado con componente Wizard reutilizable

document.addEventListener('astro:page-load', initApp); // Support for Astro View Transitions if enabled later
document.addEventListener('DOMContentLoaded', initApp);

function initApp() {
    // Prevent double init
    if (window.appInitialized) return;
    window.appInitialized = true;


    /* =========================================
       1. CONSTANTES Y CONFIGURACIÓN
       ========================================= */
    const CONFIG = {
        timeouts: {
            toastDuration: 3000,
            toastFade: 300,
            animationframe: 16
        },
        whatsapp: {
            phone: '34600000000', // Reemplazar con el número real
            baseUrl: 'https://wa.me/'
        },
        selectors: {
            steps: '.calc-step',
            toastContainer: 'toast-container',
            dropTarget: 'dropTarget',
            tintLayer: 'tintLayer',
            vinylCards: '.vinyl-card'
        },
        data: {
            provincesUrl: 'assets/data/provinces.json'
        },
        storage: {
            key: 'vinilone_wizard_state',
            expirationHours: 24
        }
    };

    /* =========================================
       1.1 INSTANCIAS DE WIZARD
       ========================================= */
    let heroWizard = null;
    let ctaWizard = null;

    /* =========================================
       1.1 DATOS DE MODELOS - MOVIDOS A Models.astro
       ========================================= */

    /* =========================================
       2. ESTADO DE LA APLICACIÓN (ENCAPSULADO)
       ========================================= */
    const AppState = {
        drag: {
            isDragging: false,
            activeClone: null,
            currentColor: ''
        }
    };

    /* =========================================
       3. CACHÉ DEL DOM (ELEMENTOS)
       ========================================= */
    const DOM = {
        // Simulator
        dropTarget: document.getElementById(CONFIG.selectors.dropTarget),
        tintLayer: document.getElementById(CONFIG.selectors.tintLayer),
        vinylCards: document.querySelectorAll(CONFIG.selectors.vinylCards)
    };

    /* =========================================
       4. UTILIDADES UI
       ========================================= */

    /**
     * Muestra un toast de notificación.
     * @param {string} message - Mensaje a mostrar.
     * @param {string} type - 'default' o 'error'.
     */
    function showToast(message, type = 'default') {
        let container = document.getElementById(CONFIG.selectors.toastContainer);
        if (!container) {
            container = document.createElement('div');
            container.id = CONFIG.selectors.toastContainer;
            container.className = 'fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none';
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        const iconName = type === 'error' ? 'alert-circle' : 'check-circle';
        const bgColor = type === 'error' ? 'bg-red-500' : 'bg-azure-900';

        toast.className = `${bgColor} text-white px-6 py-3 rounded-xl shadow-2xl transform transition-all duration-300 translate-x-full opacity-0 flex items-center gap-3 pointer-events-auto`;
        toast.innerHTML = `<i data-lucide="${iconName}" class="w-5 h-5"></i><span class="font-medium">${message}</span>`;

        container.appendChild(toast);
        if (typeof lucide !== 'undefined') lucide.createIcons();

        requestAnimationFrame(() => toast.classList.remove('translate-x-full', 'opacity-0'));
        setTimeout(() => {
            toast.classList.add('opacity-0', 'translate-y-2');
            setTimeout(() => toast.remove(), CONFIG.timeouts.toastFade);
        }, CONFIG.timeouts.toastDuration);
    }

    /* =========================================
       5. FUNCIONES GLOBALES DE UI
       ========================================= */

    // Exponer showToast globalmente para el componente Wizard
    window.showToast = showToast;


    /* =========================================
       6. SIMULADOR DRAG & DROP
       ========================================= */

    function createGhost(card, x, y) {
        const box = card.querySelector('.sample-box');
        if (!box) return null;

        const ghost = box.cloneNode(true);
        ghost.classList.add('fixed', 'z-50', 'pointer-events-none', 'shadow-2xl', 'scale-110');
        Object.assign(ghost.style, {
            width: '60px',
            height: '60px',
            borderRadius: '12px',
            left: `${x - 30}px`,
            top: `${y - 30}px`
        });
        document.body.appendChild(ghost);
        return ghost;
    }

    function checkCollision(x, y) {
        if (!DOM.dropTarget) return;
        const rect = DOM.dropTarget.getBoundingClientRect();
        const isInside = x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;

        if (isInside) {
            DOM.dropTarget.classList.add('ring-4', 'ring-brand-400', 'scale-[1.02]');
        } else {
            DOM.dropTarget.classList.remove('ring-4', 'ring-brand-400', 'scale-[1.02]');
        }
    }

    function handleDragStart(e) {
        const card = e.currentTarget;
        AppState.drag.currentColor = card.dataset.color;
        AppState.drag.isDragging = true;

        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        AppState.drag.activeClone = createGhost(card, clientX, clientY);
        card.style.opacity = '0.5';
    }

    function handleDragMove(e) {
        if (!AppState.drag.isDragging || !AppState.drag.activeClone) return;
        e.preventDefault();

        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        requestAnimationFrame(() => {
            if (AppState.drag.activeClone) {
                AppState.drag.activeClone.style.left = `${clientX - 30}px`;
                AppState.drag.activeClone.style.top = `${clientY - 30}px`;
            }
            checkCollision(clientX, clientY);
        });
    }

    function handleDragEnd() {
        if (!AppState.drag.isDragging) return;
        AppState.drag.isDragging = false;

        if (DOM.dropTarget && DOM.dropTarget.classList.contains('ring-4')) {
            // Drop Exitoso
            if (DOM.tintLayer) {
                DOM.tintLayer.style.backgroundColor = AppState.drag.currentColor;
                DOM.tintLayer.style.opacity = '0.7';
            }
            DOM.dropTarget.classList.remove('ring-4', 'ring-brand-400', 'scale-[1.02]');
            DOM.dropTarget.animate([
                { transform: 'scale(1)' }, { transform: 'scale(1.05)' }, { transform: 'scale(1)' }
            ], { duration: 300 });
        }

        if (AppState.drag.activeClone) {
            AppState.drag.activeClone.remove();
            AppState.drag.activeClone = null;
        }
        DOM.vinylCards.forEach(c => c.style.opacity = '1');
    }


    /* =========================================
       7. INICIALIZACIÓN DE WIZARDS
       ========================================= */

    /* =========================================
       7.1 DRAG & DROP EVENTS (SIMULADOR)
       ========================================= */

    // Drag & Drop Events
    DOM.vinylCards.forEach(card => {
        card.addEventListener('touchstart', handleDragStart, { passive: false });
        card.addEventListener('mousedown', handleDragStart);
        // Click simple de accesibilidad
        card.addEventListener('click', () => {
            if (DOM.tintLayer && card.dataset.color) {
                DOM.tintLayer.style.backgroundColor = card.dataset.color;
                DOM.tintLayer.style.opacity = '0.7';
            }
        });
    });

    window.addEventListener('touchmove', handleDragMove, { passive: false });
    window.addEventListener('touchend', handleDragEnd);
    window.addEventListener('mousemove', handleDragMove);
    window.addEventListener('mouseup', handleDragEnd);

    // F. Sobre Nosotros (Acordeón Dual)
    /**
     * Alterna la visibilidad de una SectionCard colapsable.
     * @param {HTMLElement} card - El elemento .directory-card
     */
    function toggleSectionCard(card) {
        if (!card || !card.dataset.collapsible) return;

        const content = card.querySelector('.section-card-content');
        const icon = card.querySelector('.section-card-icon');
        const isOpen = card.classList.contains('open');

        if (isOpen) {
            // Cerrar
            card.classList.remove('open');
            if (icon) icon.style.transform = 'rotate(0deg)';

            content.classList.add('hidden');
        } else {
            // Abrir
            card.classList.add('open');
            if (icon) icon.style.transform = 'rotate(180deg)';

            content.classList.remove('hidden');
            // Forzar reflow y animar si se desea (aquí es display toggle simple por ahora)
        }
    }

    // Event listener general para headers de cartas colapsables
    document.addEventListener('click', (e) => {
        const header = e.target.closest('.section-card-header');
        if (header) {
            const card = header.closest('.directory-card');
            if (card && card.dataset.collapsible === 'true') {
                // Togglear la carta
                toggleSectionCard(card);
            }
        }
    });






    // G. Nuestros Modelos - MOVIDO A Models.astro (patrón Master-Detail)

    // H. Inicialización Principal
    if (typeof lucide !== 'undefined') lucide.createIcons();

    /* =========================================
       9. RESEÑAS - FECHAS DINÁMICAS, MODAL Y CARRUSEL
       ========================================= */

    /**
     * Actualiza las fechas de las reseñas calculando el tiempo relativo.
     */
    function updateReviewDates() {
        const dateElements = document.querySelectorAll('.dynamic-date');
        const now = new Date();

        dateElements.forEach(el => {
            const dateString = el.getAttribute('data-date');
            if (!dateString) return;

            const pastDate = new Date(dateString);
            const diffTime = Math.abs(now - pastDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            let timeText = '';

            if (diffDays < 7) {
                timeText = 'Hace unos días';
            } else if (diffDays < 30) {
                const weeks = Math.floor(diffDays / 7);
                timeText = `Hace ${weeks} semana${weeks > 1 ? 's' : ''}`;
            } else if (diffDays < 365) {
                const months = Math.floor(diffDays / 30.44);
                if (months < 1) {
                    timeText = 'Hace 1 mes';
                } else {
                    timeText = `Hace ${months} mes${months > 1 ? 'es' : ''}`;
                }
            } else {
                const years = Math.floor(diffDays / 365);
                timeText = `Hace ${years} año${years > 1 ? 's' : ''}`;
            }

            el.textContent = timeText;
        });
    }

    updateReviewDates();

    /**
     * Carrusel infinito con CSS + JS para interacción
     * CSS maneja la animación (GPU), JS maneja pausa/resume
     * Auto-clona contenido para loop infinito (reduce HTML duplicado)
     */
    function initMarqueeScrollers() {
        const containers = document.querySelectorAll('.marquee-container');

        containers.forEach((container) => {
            const track = container.querySelector('.marquee-track');
            if (!track) return;

            // Auto-clonar contenido para loop infinito si no existe duplicado
            const originalContent = track.querySelector('.flex');
            if (originalContent && track.children.length === 1) {
                const clone = originalContent.cloneNode(true);
                clone.setAttribute('aria-hidden', 'true'); // Evitar lectores de pantalla
                track.appendChild(clone);
            }

            let resumeTimeout = null;

            function pause() {
                track.style.animationPlayState = 'paused';
                clearTimeout(resumeTimeout);
            }

            function resume() {
                clearTimeout(resumeTimeout);
                resumeTimeout = setTimeout(() => {
                    track.style.animationPlayState = 'running';
                }, 800);
            }

            // Eventos de interacción
            container.addEventListener('pointerdown', pause);
            container.addEventListener('pointerup', resume);
            container.addEventListener('pointerleave', resume);
            container.addEventListener('pointercancel', resume);

            // Asegurar que la animación está corriendo
            track.style.animationPlayState = 'running';
        });
    }

    // Ejecutar inmediatamente - ya estamos en DOMContentLoaded
    initMarqueeScrollers();

    console.log('Vinilone App Loaded v5.2 - CTA Logic Moved to Component');
}