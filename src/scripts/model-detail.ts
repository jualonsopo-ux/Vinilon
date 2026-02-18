/**
 * Model Detail - Lógica de interacción para el modal de modelos
 *
 * Extraído de Models.astro para mejor mantenibilidad y tipado.
 * Se importa en Models.astro y se inicializa en DOMContentLoaded.
 */

export interface ModelFeature {
  icon: string;
  title: string;
  desc: string;
}

export interface ModelData {
  title: string;
  subtitle: string;
  badge?: string;
  price: string;
  desc: string;
  specs: { heat: string; uv: string; light: string };
  features: ModelFeature[];
  image: string;
}

export type ModelsMap = Record<string, ModelData>;

/**
 * Inicializa la lógica del modal de detalle de modelos
 */
export function initModelDetail(models: ModelsMap): void {
  const listView = document.getElementById('models-list-view');
  const detailView = document.getElementById('models-detail-view');
  const headerMain = document.getElementById('header-main');
  const headerDetail = document.getElementById('header-detail-nav');

  let triggerElement: HTMLElement | null = null;

  /**
   * Abre el modal de detalle con los datos del modelo
   */
  function openDetail(key: string, trigger?: HTMLElement): void {
    const data = models[key];
    if (!data) return;

    triggerElement = trigger ?? null;

    // Imagen
    const img = document.getElementById('detail-img') as HTMLImageElement | null;
    if (img) {
      img.src = data.image;
      img.alt = data.title;
    }

    // Textos principales
    setText('detail-title', data.title);
    setText('detail-subtitle', data.subtitle);
    setText('detail-desc', data.desc);

    // Specs
    setText('spec-heat', data.specs.heat);
    setText('spec-uv', data.specs.uv);
    setText('spec-light', data.specs.light);

    // Precio
    setText('detail-price', data.price);

    // Badge
    const badge = document.getElementById('detail-badge');
    if (badge) {
      if (data.badge) {
        badge.textContent = data.badge;
        badge.classList.remove('hidden');
      } else {
        badge.classList.add('hidden');
      }
    }

    // Features - mostrar solo las del modelo activo
    document.querySelectorAll('[data-model-features]').forEach((el) => {
      el.classList.add('hidden');
    });
    const featuresEl = document.querySelector(`[data-model-features="${key}"]`);
    featuresEl?.classList.remove('hidden');

    // Toggle vistas
    listView?.classList.add('hidden');
    detailView?.classList.remove('hidden');
    headerMain?.classList.add('hidden');
    headerDetail?.classList.remove('hidden');

    // Bloquear scroll del body
    document.body.style.overflow = 'hidden';

    // Focus management (accesibilidad)
    requestAnimationFrame(() => {
      document.getElementById('btn-back-internal')?.focus();
    });
  }

  /**
   * Cierra el modal de detalle
   */
  function closeDetail(): void {
    detailView?.classList.add('hidden');
    listView?.classList.remove('hidden');
    headerDetail?.classList.add('hidden');
    headerMain?.classList.remove('hidden');

    // Restaurar scroll
    document.body.style.overflow = '';

    // Restaurar focus al trigger original
    triggerElement?.focus();
    triggerElement = null;
  }

  /**
   * Navega al calculador de presupuesto
   */
  function goToCalculator(): void {
    closeDetail();
    setTimeout(() => {
      document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }

  /**
   * Helper para setear texto en un elemento por ID
   */
  function setText(id: string, text: string): void {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  // ========== Event Binding ==========

  // Clicks en tarjetas del carrusel
  document.querySelectorAll('.model-card-trigger').forEach((btn) => {
    btn.addEventListener('click', () => {
      const element = btn as HTMLElement;
      openDetail(element.dataset.model ?? '', element);
    });
  });

  // Botones de volver/cerrar
  document.getElementById('btn-back-models')?.addEventListener('click', closeDetail);
  document.getElementById('btn-back-internal')?.addEventListener('click', closeDetail);
  document.getElementById('btn-x-internal')?.addEventListener('click', closeDetail);

  // Botón pedir presupuesto
  document.getElementById('btn-add-budget-internal')?.addEventListener('click', goToCalculator);

  // Cerrar al hacer click en el backdrop
  detailView?.querySelector('.fixed')?.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
      closeDetail();
    }
  });

  // ESC para cerrar
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !detailView?.classList.contains('hidden')) {
      closeDetail();
    }
  });
}

/**
 * Auto-inicialización para uso con script tag
 * Debe llamarse pasando los datos de modelos
 */
export function autoInit(models: ModelsMap): void {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initModelDetail(models));
  } else {
    initModelDetail(models);
  }

  // Soporte para Astro View Transitions
  document.addEventListener('astro:page-load', () => initModelDetail(models));
}
