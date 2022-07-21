module.exports = {
    mode: 'jit',
    // purge: ['./**/*.{js,jsx,ts,tsx}', './public/index.html'],
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
        './containers/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: '#2962ff',
                secondary: '#1e222d',
                'light-orange': '##EE4600',
                'text-01': '#d1d4dc',
                'text-02': '#868993',
                error: '#f23645',
                'border-01': '#868993',
                'border-02': '#2962ff',
            },
            screens: {
                xl: { max: '1279px' },
                // => @media (max-width: 1279px) { ... }

                lg: { max: '1023px' },
                // => @media (max-width: 1023px) { ... }

                md: { max: '767px' },
                // => @media (max-width: 767px) { ... }

                sm: { max: '639px' },
                // => @media (max-width: 639px) { ... }
            },
        },
    },
    plugins: [],
}
