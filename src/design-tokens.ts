/**
 * VINILONE - Design Tokens
 * Versión: 2.0
 *
 * Este archivo exporta los tokens del sistema de diseño como constantes TypeScript.
 * Úsalos en componentes Astro para garantizar consistencia.
 *
 * IMPORTANTE: Estos valores deben estar sincronizados con:
 * - src/styles/global.css (CSS Custom Properties)
 * - tailwind.config.mjs (Tailwind theme)
 */

// ═══════════════════════════════════════════════════════════════════════════
// COLORES
// ═══════════════════════════════════════════════════════════════════════════

export const colors = {
  brand: {
    50: '#ece9fc',
    100: '#c3baf7',
    200: '#B9ADF4',
    300: '#7c6aee',
    400: '#634dea',
    500: '#3c20e5', // Primary
    600: '#371dd0',
    700: '#2b17a3',
    800: '#21127e',
    900: '#190d60',
  },
  azure: {
    25: '#F8FAFC',
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8', // Muted text
    500: '#64748B', // Secondary text
    600: '#475569', // Body text
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A', // Headings
  },
  semantic: {
    whatsapp: '#25D366',
    whatsappHover: '#1DA851',
    error: '#EF4444',
    errorLight: '#FEE2E2',
    success: '#22C55E',
    successLight: '#DCFCE7',
    successDark: '#14532D',
    warning: '#F59E0B',
    warningLight: '#FEF3C7',
    warningDark: '#92400E',
  },
} as const;

// ═══════════════════════════════════════════════════════════════════════════
// TIPOGRAFÍA
// ═══════════════════════════════════════════════════════════════════════════

export const typography = {
  fontFamily: {
    body: "'Inter', sans-serif",
    heading: "'Inter Tight', 'Inter', sans-serif",
  },
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.75rem', // 28px
    '4xl': '2.25rem', // 36px
    '5xl': '2.625rem', // 42px
    '6xl': '3rem',    // 48px
    '7xl': '3.5rem',  // 56px
    '8xl': '4rem',    // 64px
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
  lineHeight: {
    none: 1,
    tight: 1.1,
    snug: 1.25,
    normal: 1.5,
    relaxed: 1.625,
  },
  letterSpacing: {
    tighter: '-0.03em',
    tight: '-0.015em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
} as const;

// ═══════════════════════════════════════════════════════════════════════════
// ESPACIADO
// ═══════════════════════════════════════════════════════════════════════════

export const spacing = {
  0: '0',
  1: '0.25rem',  // 4px
  2: '0.5rem',   // 8px
  3: '0.75rem',  // 12px
  4: '1rem',     // 16px
  5: '1.25rem',  // 20px
  6: '1.5rem',   // 24px
  8: '2rem',     // 32px
  10: '2.5rem', // 40px
  12: '3rem',   // 48px
  16: '4rem',   // 64px
  18: '4.5rem', // 72px
  20: '5rem',   // 80px
  22: '5.5rem', // 88px
  24: '6rem',   // 96px
} as const;

// ═══════════════════════════════════════════════════════════════════════════
// BORDER RADIUS
// ═══════════════════════════════════════════════════════════════════════════

export const borderRadius = {
  xs: '4px',
  sm: '8px',
  DEFAULT: '12px',
  lg: '16px',
  xl: '24px',
  '2xl': '32px',
  full: '9999px',
} as const;

// ═══════════════════════════════════════════════════════════════════════════
// SOMBRAS
// ═══════════════════════════════════════════════════════════════════════════

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  brand: '0 10px 15px -3px rgba(60, 32, 229, 0.15)',
  brandStrong: '0 20px 25px -5px rgba(60, 32, 229, 0.4), 0 10px 10px -5px rgba(60, 32, 229, 0.3)',
  card: '0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.04)',
  cardHover: '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -4px rgba(0, 0, 0, 0.04)',
} as const;

// ═══════════════════════════════════════════════════════════════════════════
// TRANSICIONES
// ═══════════════════════════════════════════════════════════════════════════

export const transitions = {
  duration: {
    fast: '0.15s',
    normal: '0.2s',
    slow: '0.3s',
  },
  easing: {
    out: 'cubic-bezier(0.25, 0.8, 0.25, 1)',
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const;

// ═══════════════════════════════════════════════════════════════════════════
// BREAKPOINTS
// ═══════════════════════════════════════════════════════════════════════════

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// ═══════════════════════════════════════════════════════════════════════════
// COMPONENTES - CONSTANTES
// ═══════════════════════════════════════════════════════════════════════════

export const components = {
  card: {
    paddingMobile: '1rem',    // 16px
    paddingDesktop: '2rem',   // 32px
    radius: '16px',           // --radius-lg
    border: `1px solid ${colors.azure[200]}`,
  },
  badge: {
    padding: '0.25rem 0.5rem',
    radius: '8px',
    fontSize: '0.75rem',
  },
  iconBox: {
    sm: '2rem',    // 32px
    md: '2.25rem', // 36px
    lg: '2.5rem',  // 40px
  },
  button: {
    padding: '1rem',
    radius: '12px',
  },
} as const;

// ═══════════════════════════════════════════════════════════════════════════
// WHATSAPP CONFIG
// ═══════════════════════════════════════════════════════════════════════════

export const whatsappConfig = {
  phone: '34600000000', // Reemplazar con número real
  baseUrl: 'https://wa.me/',
} as const;

// ═══════════════════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Genera una variable CSS con fallback
 * @example cssVar('brand-500') => 'var(--brand-500)'
 */
export function cssVar(name: string, fallback?: string): string {
  return fallback ? `var(--${name}, ${fallback})` : `var(--${name})`;
}

/**
 * Obtiene un color de la paleta
 * @example getColor('brand', 500) => '#3c20e5'
 */
export function getColor(
  palette: 'brand' | 'azure',
  shade: keyof typeof colors.brand | keyof typeof colors.azure
): string {
  return colors[palette][shade as keyof (typeof colors)[typeof palette]];
}

// ═══════════════════════════════════════════════════════════════════════════
// TIPOS
// ═══════════════════════════════════════════════════════════════════════════

export type ColorPalette = typeof colors;
export type BrandShade = keyof typeof colors.brand;
export type AzureShade = keyof typeof colors.azure;
export type FontSize = keyof typeof typography.fontSize;
export type FontWeight = keyof typeof typography.fontWeight;
export type Spacing = keyof typeof spacing;
export type BorderRadius = keyof typeof borderRadius;
export type Shadow = keyof typeof shadows;
export type Breakpoint = keyof typeof breakpoints;
