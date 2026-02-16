/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                brand: {
                    50: '#ece9fc',
                    100: '#c3baf7',
                    200: '#B9ADF4',
                    300: '#7c6aee',
                    400: '#634dea',
                    500: '#3c20e5',
                    600: '#371dd0',
                    700: '#2b17a3',
                    800: '#21127e',
                    900: '#190d60',
                },
                azure: {
                    25: '#F8FAFC', // Agregué este porque lo usas en el body
                    50: '#F8FAFC',
                    100: '#F1F5F9',
                    200: '#E2E8F0',
                    300: '#CBD5E1',
                    400: '#94A3B8',
                    500: '#64748B',
                    600: '#475569',
                    700: '#334155',
                    800: '#1E293B',
                    900: '#0F172A',
                },
            },
            fontFamily: {
                body: ['Inter', 'sans-serif'],
                heading: ['Inter Tight', 'Inter', 'sans-serif'],
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
