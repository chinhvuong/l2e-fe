import HomePageContainer from '@/containers/home'

const HomePage = () => <HomePageContainer />

export const getStaticProps = async ({ locale }: { locale: string }) => {
    const {
        serverSideTranslations,
    } = require('next-i18next/serverSideTranslations')

    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    }
}

export default HomePage
