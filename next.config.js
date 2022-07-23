const path = require('path')
const { i18n } = require('./next-i18next.config')
module.exports = {
    i18n,
    sassOptions: {
        includePaths: ['./**/*.scss'],
    },
    webpack5: true,
    webpack(config) {
        config.resolve.fallback = { fs: false }
        // if not work, try `config.module.rules[2]...`
        config.module.rules[3].oneOf.forEach((one) => {
            if (!`${one.issuer?.and}`.includes('_app')) return
            one.issuer.and = [path.resolve(__dirname)]
        })

        config.module.rules.push({
            test: /\.svg$/,
            issuer: {
                //   test: /\.(js|ts)x?$/,
                // for webpack 5 use
                and: [/\.(js|ts)x?$/],
            },

            use: ['@svgr/webpack'],
        })

        return config
    },
}
