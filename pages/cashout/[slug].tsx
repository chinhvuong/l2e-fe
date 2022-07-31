import CashoutDetail from '@/containers/cashout/detail'
import React from 'react'

const CashoutDetailPage = () => {
    return (
        <div>
            <CashoutDetail />
        </div>
    )
}
export const getServerSideProps = async ({ locale }: { locale: string }) => {
    const {
        serverSideTranslations,
    } = require('next-i18next/serverSideTranslations')

    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    }
}
export default CashoutDetailPage
