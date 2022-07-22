module.exports = {
    mode: 'jit',
    // purge: ['./**/*.{js,jsx,ts,tsx}', './public/index.html'],
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './layout/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
        './containers/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                gradient: 'linear-gradient(180deg, #EE4600 0%, #FF864A 100%)',

                pri: '#EE4600', //orange
                'pri-52': 'rgba(238, 70, 0, 0.52)', // orange opacity 0.52
                'pri-52': 'rgba(238, 70, 0, 0.50)', // orange opacity 0.50
                'pri-17': 'rgba(238, 70, 0, 0.17)',

                second: '#0F62F9', //blue
                'second-17': 'rgba(15, 98, 249, 0.72)', // blue opacity 0.17

                black: '#000000',
                'black-50': 'rgba(0, 0, 0, 0.5)',
                'black-47': 'rgba(0, 0, 0, 0.47)',
                'black-70': 'rgba(0, 0, 0, 0.70)',
                'black-20': 'rgba(0, 0, 0, 0.20)',

                white: '#FFFFFF',

                'gray-d9': '#D9D9D9',
                'gray-d9-28': 'rgba(216, 216, 216, 0.28)',
                'gray-d9-30': 'rgba(216, 216, 216, 0.3)',
                'gray-d8-30': 'rgba(216, 216, 216, 0.3)',

                'gray-c4': '#C4C4C4',
                error: '#f23645',
            },
            boxShadow: {
                20: '0px 2px 20px rgba(20, 19, 19, 0.05)',
                30: '0px 2px 30px rgba(20, 19, 19, 0.05)',
                40: '0px 2px 40px rgba(0, 0, 0, 0.05)',
                form: '0px 2px 30px rgba(20, 19, 19, 0.05)',
            },
            blur: {
                shadow: 'drop-shadow(0px 2px 30px rgba(20, 19, 19, 0.05))',
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
