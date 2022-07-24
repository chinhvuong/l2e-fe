import React from 'react'
import OrderContainer from '@/containers/order/detail'

const OrderDetail = () => {
    return (
        <div>
            <OrderContainer />
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

export default OrderDetail
