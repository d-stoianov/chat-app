/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                lightYellow: '#F9E4CB',
                lightGray: '#F2F2F2',
                hoverBlack: '#2B2B2B',
            },
        },
    },
    plugins: [],
}
