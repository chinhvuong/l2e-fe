const path = require('path')

module.exports = {
    i18n: {
        defaultLocale: 'en',
        locales: ['en', 'vi', 'ja', 'zh-hans'],
        defaultNS: 'common',
        localePath: path.resolve('./locales/resources'),
        reloadOnPrerender:
            process.env.NODE_ENV === 'development' ? true : false,
    },
}
console.log(path.resolve('./locales/resources'))
