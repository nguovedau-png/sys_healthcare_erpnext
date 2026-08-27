/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#0f766e', // Deep Teal (Premium Medical) - replaces #47af50
                    light: '#2dd4bf',
                    dark: '#115e59',
                },
                secondary: {
                    DEFAULT: '#0ea5e9', // Sky Blue (Trust) - replaces #00ab8e
                    light: '#7dd3fc',
                    dark: '#0284c7',
                },
                accent: {
                    DEFAULT: '#f43f5e', // Rose/Coral for Call to Actions
                },
                gray: {
                    50: '#f9fafb',
                    100: '#f3f4f6',
                    800: '#1f2937', // Dark Gray text
                    900: '#111827',
                }
            },
            fontFamily: {
                sans: ['var(--font-geist-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
                heading: ['var(--font-geist-mono)', 'ui-serif', 'serif'],
            },
            boxShadow: {
                'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
                'card': '0 0 0 1px rgba(0,0,0,0.03), 0 2px 8px rgba(0,0,0,0.04)',
            }
        },
    },
    plugins: [],
}
