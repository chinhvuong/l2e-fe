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
                'primary-outline-hover': '#FCF1E1',
                second: '#0F124D', // blue
                star: '#F1C644',
                'hyperlink-light': '#D3BAFF',
                hyperlink: '#5624D0',
                divider: '#B6B6B6',
                'border-box': '#D1D7DC',
                description: '#6A6F73',
                'course-section': '#F7F9FA',

                it: '#2267B5',
                health: '#5DBD6A',
                language: '#2CD1E6',
                business: '#7070E3',
                management: '#DD5450',
                personal_development: '#F5C353',
                sales_marketing: '#E557A3',
                engineer_construction: '#A861AD',
                teaching_academics: '#F48C06',
            },
            backgroundImage: {
                gradient: 'linear-gradient(180deg, #EE4600 0%, #FF864A 100%)',
                bestseller:
                    'linear-gradient(to right, #FF0000, rgba(254,207,87,1))',
            },
            screens: {
                above_xl: { min: '1024px' },
                under_xl: { max: '1023px' },
                under_2xl: { max: '1279px' },
                under_lg: { max: '767px' },
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
        {
            pattern:
                /(bg|text|border)-(it|health|language|business|management|personal_development|sales_marketing|engineer_construction|teaching_academics|bestseller)/,
        },
    ],
}
