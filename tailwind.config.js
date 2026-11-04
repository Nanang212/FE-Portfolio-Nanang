import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                display: ['"Bebas Neue"', 'sans-serif'],
                serif: ['"EB Garamond"', 'Georgia', 'serif'],
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                paper: {
                    50:  '#faf8f4',
                    100: '#f4eedf',
                    200: '#e7decb',
                    300: '#d5c7ad',
                    800: '#1c242c',
                    900: '#141b21',
                    950: '#0d1318',
                },
                accent: {
                    DEFAULT: '#1f382b',
                    hover: '#15271e',
                    light: '#2a4c3a',
                    dark: '#2ea879',
                },
                primary: {
                    50:  '#eff6ff',
                    100: '#dbeafe',
                    200: '#bfdbfe',
                    300: '#93c5fd',
                    400: '#60a5fa',
                    500: '#3b82f6',
                    600: '#2563eb',
                    700: '#1d4ed8',
                    800: '#1e40af',
                    900: '#1e3a8a',
                },
            },
        },
    },
    plugins: [],
};
