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

                primary: '#F48C06', // orange
                'primary-hover': '#FFAB40', // brighter orange
                second: '#0F124D', // blue
                it: '#2267B5',
                health: '#5DBD6A',
                language: '#2CD1E6',
                business: '#7070E3',
                management: '#DD5450',
                personal_development: '#F5C353',
                sales_marketing: '#E557A3',
                engineer_construction: '#A861AD',
                teaching_academics: '#F48C06',

                star: '#F1C644',

                pri: '#EE4600', //orange
                'pri-52': 'rgba(238, 70, 0, 0.52)', // orange opacity 0.52
                'pri-17': 'rgba(238, 70, 0, 0.17)',
                'pri-15': 'rgba(221, 21, 8, 0.15)',
                'pri-1': 'rgba(238, 70, 0, 1)',
                'pri-8-1': 'rgba(221, 21, 8, 1)',
                'pri-6-1': 'rgba(217, 119, 6, 1)',
                'pri-005': 'rgba(238, 70, 0, 0.5)',

                'second-17': 'rgba(15, 98, 249, 0.72)', // blue opacity 0.17

                black: '#000000',
                'black-50': 'rgba(0, 0, 0, 0.5)',
                'black-47': 'rgba(0, 0, 0, 0.47)',
                'black-70': 'rgba(0, 0, 0, 0.70)',
                'black-20': 'rgba(0, 0, 0, 0.20)',
                'black-07': 'rgba(0, 0, 0, 0.07)',
                'black-02': 'rgba(0, 0, 0, 0.2)',
                'grey-1': 'rgba(55, 63, 79, 1)',

                white: '#FFFFFF',

                'gray-d9': '#D9D9D9',
                'gray-38': 'rgba(217, 217, 217, 0.38)',
                'gray-d9-28': 'rgba(216, 216, 216, 0.28)',
                'gray-d9-30': 'rgba(216, 216, 216, 0.3)',
                'gray-d8-30': 'rgba(216, 216, 216, 0.3)',
                'gray-1': 'rgba(122, 136, 156, 1)',
                'gray-F9': ' #F1F5F9',
                'gray-06': 'rgba(200, 200, 200, 0.6)',
                'gray-07': 'rgba(217, 217, 217, 0.7)',

                'gray-c4': '#C4C4C4',

                'green-015': 'rgba(0, 173, 59, 0.15)',
                'green-1': 'rgba(0, 173, 59, 1)',

                'yellow-7': '#FEF3C7',
                error: '#f23645',
            },
            backgroundImage: {
                gradient: 'linear-gradient(180deg, #EE4600 0%, #FF864A 100%)',
                bestseller:
                    'linear-gradient(to right, #FF0000, rgba(254,207,87,1))',
            },
            boxShadow: {
                20: '0px 2px 20px rgba(20, 19, 19, 0.05)',
                30: '0px 2px 30px rgba(20, 19, 19, 0.05)',
                40: '0px 2px 40px rgba(0, 0, 0, 0.05)',
                form: '0px 2px 30px rgba(20, 19, 19, 0.05)',
                '40-08': ' 0px 2px 40px rgba(0, 0, 0, 0.08)',
                '008': '0px 2px 40px rgba(0, 0, 0, 0.08)',
            },
            blur: {
                shadow: 'drop-shadow(0px 2px 30px rgba(20, 19, 19, 0.05))',
            },
            screens: {
                under_lg: { max: '1023px' },
                under_xl: { max: '1279px' },
                under_md: { max: '767px' },
                '2xl': { min: '1280px' },
                xl: { max: '1279px', min: '1024px' },
                lg: { max: '1023px', min: '768px' },
                md: { max: '767px', min: '640px' },
                sm: { max: '639px' },
            },
        },
    },
    plugins: [require('@tailwindcss/line-clamp')],
    safelist: [
        'bg-it',
        'bg-health',
        'bg-language',
        'bg-business',
        'bg-management',
        'bg-personal_development',
        'bg-sales_marketing',
        'bg-engineer_construction',
        'bg-teaching_academics',
        'bg-bestseller',
    ],
}
