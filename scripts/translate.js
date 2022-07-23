const axios = require('axios')
const fs = require('fs')

const googleSheetTranslate =
    'https://script.google.com/macros/s/AKfycbxVCNnMhNeJ4ixd2bxWsDyv7EfOPQhByv1FR-mPGbfwT0He7siQBUOj9C3HmVzYkmMjWg/exec'

async function pullTranslate() {
    const res = await axios.get(googleSheetTranslate)

    const dataRes = res.data
    const localesTitle = []

    dataRes.map((obj) => localesTitle.push(Object.keys(obj)[0]))

    let dataLocales = {}

    dataRes.forEach((obj) => {
        dataLocales = Object.assign(dataLocales, obj)
    })

    localesTitle.forEach((locale) => createFile(locale, dataLocales[locale]))
}

function createFile(name, content) {
    try {
        const resourcesDir = './locales/resources'

        if (!fs.existsSync(resourcesDir)) fs.mkdirSync(resourcesDir)

        const dir = `./locales/resources/${name}`

        if (!fs.existsSync(dir)) fs.mkdirSync(dir)

        fs.writeFileSync(dir + '/common.json', JSON.stringify(content))

        console.log(`\x1b[32m${name} \x1b[0mlanguage has been updated`)
    } catch (error) {
        console.log(
            `There was an \x1b[31merror \x1b[0mwhile updating the \x1b[32m${name} \x1b[0mlanguage file`,
        )
    }
}

;(() => pullTranslate())()
