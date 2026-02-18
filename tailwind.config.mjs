/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                // ═══════════════════════════════════════════════════════════
                // BRAND (Primario - Violeta/Indigo)
                // Uso: Botones primarios, enlaces, acentos principales
                // ═══════════════════════════════════════════════════════════
                brand: {
                    50: '#ece9fc',
                    100: '#c3baf7',
                    200: '#B9ADF4',
                    300: '#7c6aee',
                    400: '#634dea',
                    500: '#3c20e5',  // ← PRIMARY (usar para CTAs)
                    600: '#371dd0',
                    700: '#2b17a3',
                    800: '#21127e',
                    900: '#190d60',
                },
                // ═══════════════════════════════════════════════════════════
                // AZURE (Neutros - Gris Azulado)
                // Uso: Fondos, bordes, textos secundarios
                // ═══════════════════════════════════════════════════════════
                azure: {
                    25: '#F8FAFC',   // Body background
                    50: '#F8FAFC',
                    100: '#F1F5F9',
                    200: '#E2E8F0',
                    300: '#CBD5E1',
                    400: '#94A3B8',  // Muted text
                    500: '#64748B',  // Secondary text
                    600: '#475569',  // Body text
                    700: '#334155',
                    800: '#1E293B',
                    900: '#0F172A',  // Headings
                },
                // ═══════════════════════════════════════════════════════════
                // SEMANTIC COLORS (Feedback & Estados)
                // ═══════════════════════════════════════════════════════════
                whatsapp: {
                    DEFAULT: '#25D366',
                    hover: '#1DA851',
                    light: 'rgba(37, 211, 102, 0.1)',
                },
                error: {
                    DEFAULT: '#EF4444',
                    light: '#FEE2E2',
                    dark: '#DC2626',
                },
                success: {
                    DEFAULT: '#22C55E',
                    light: '#DCFCE7',
                    dark: '#14532D',
                },
                warning: {
                    DEFAULT: '#F59E0B',
                    light: '#FEF3C7',
                    dark: '#92400E',
                },
            },
            // ═══════════════════════════════════════════════════════════
            // BORDER RADIUS
            // Alineado con CSS custom properties en global.css
            // ═══════════════════════════════════════════════════════════
            borderRadius: {
                'xs': '4px',        // --radius-xs
                'sm': '8px',        // --radius-sm
                DEFAULT: '12px',    // --radius (cards, inputs)
                'lg': '16px',       // --radius-lg
                'xl': '24px',       // --radius-xl
                '2xl': '32px',
                'full': '9999px',   // Pills, avatars
            },
            // ═══════════════════════════════════════════════════════════
            // TYPOGRAPHY
            // Extensión de la escala para headings grandes
            // ═══════════════════════════════════════════════════════════
            fontSize: {
                // Extensión para títulos hero y secciones grandes
                '6xl': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],     // 48px
                '7xl': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],   // 56px
                '8xl': ['4rem', { lineHeight: '1.05', letterSpacing: '-0.03em' }],    // 64px
            },
            fontFamily: {
                body: ['Inter', 'sans-serif'],
                heading: ['Inter Tight', 'Inter', 'sans-serif'],
            },
            // ═══════════════════════════════════════════════════════════
            // SPACING (Tokens adicionales)
            // ═══════════════════════════════════════════════════════════
            spacing: {
                '18': '4.5rem',     // 72px
                '22': '5.5rem',     // 88px
            },
            // ═══════════════════════════════════════════════════════════
            // BOX SHADOW
            // Sombras con tinte brand para depth visual
            // ═══════════════════════════════════════════════════════════
            boxShadow: {
                'brand': '0 10px 15px -3px rgba(60, 32, 229, 0.15)',
                'brand-lg': '0 20px 25px -5px rgba(60, 32, 229, 0.25), 0 10px 10px -5px rgba(60, 32, 229, 0.15)',
                'card': '0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.04)',
                'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -4px rgba(0, 0, 0, 0.04)',
            },
            keyframes: {
                scrollLeft: {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-100%)' },
                },
                scrollRight: {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(0)' },
                },
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
            },
            animation: {
                'scroll-left': 'scrollLeft 30s linear infinite',
                'scroll-right': 'scrollRight 30s linear infinite',
                'fade-in': 'fadeIn 0.5s ease-out forwards',
            },
        },
    },
    plugins: [],
};
