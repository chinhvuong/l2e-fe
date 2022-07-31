import Cashout from '@/containers/cashout'
import React from 'react'

const CashoutPage = () => {
    return (
        <div>
            <Cashout />
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
export default CashoutPage
