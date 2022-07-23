import HomePageContainer from '@/containers/home'

const HomePage = () => <HomePageContainer />

export const getStaticProps = async ({ locale }: { locale: string }) => {
    console.log(
        '🚀 ~ file: index.tsx ~ line 7 ~ getStaticProps ~ locale',
        locale,
    )
    const {
        serverSideTranslations,
    } = require('next-i18next/serverSideTranslations')
    const res = await serverSideTranslations(locale, ['common'])
    console.log({ ...res._nextI18Next.initialI18nStore })

    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    }
}

export default HomePage
