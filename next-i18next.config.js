const path = require('path')

module.exports = {
    i18n: {
        defaultLocale: 'vi',
        locales: ['en', 'vi'],
    },
    localePath: path.resolve('./locales/resources'),
    reloadOnPrerender: process.env.NODE_ENV === 'development' ? true : false,
}
console.log(path.resolve('./locales/resources'))
