import React from 'react'
import Customer from '@/containers/customer'

const CustomerPage = () => {
    return (
        <div>
            <Customer />
        </div>
    )
}
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
export default CustomerPage
