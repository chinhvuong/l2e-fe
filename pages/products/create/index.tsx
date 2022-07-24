import React, { ReactElement } from 'react'
import CreateProductContainer from '@/containers/products/create'
import Layout from '@/layout/second-layout'

const Create = () => {
    return <CreateProductContainer />
}

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

Create.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}
export default Create
