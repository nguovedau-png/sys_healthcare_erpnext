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
                    DEFAULT: '#1677ff', // Ant Design Blue
                    light: '#69b1ff',
                    dark: '#0958d9',
                    hover: '#4096ff',
                },
                secondary: {
                    DEFAULT: '#52c41a', // Ant Design Green
                    light: '#95de64',
                    dark: '#389e0d',
                },
                accent: {
                    DEFAULT: '#ff4d4f', // Ant Design Red
                },
                gray: {
                    50: '#fafafa',
                    100: '#f5f5f5',
                    200: '#f0f0f0',
                    300: '#d9d9d9',
                    400: '#8c8c8c',
                    500: '#595959',
                    600: '#434343',
                    700: '#262626',
                    800: '#1f1f1f',
                    900: '#141414',
                }
            },
            fontFamily: {
                sans: ['var(--font-geist-sans)', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
                heading: ['var(--font-geist-mono)', 'ui-serif', 'Georgia', 'serif'],
            },
            boxShadow: {
                'soft': '0 2px 8px rgba(0, 0, 0, 0.08)',
                'card': '0 1px 2px 0 rgba(0, 0, 0, 0.05), 0 4px 8px -2px rgba(0, 0, 0, 0.1)',
                'ant': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
            }
        },
    },
    plugins: [],
}
