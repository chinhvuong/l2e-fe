import React from 'react'
import CanceledOrders from '@/containers/canceled-orders'

const CanceledOrdersPage = () => {
    return (
        <div>
            <CanceledOrders />
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

export default CanceledOrdersPage
