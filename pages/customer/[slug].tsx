import React from 'react'
import CustomerDetail from '@/containers/customer/detail'

const CustomerDetailPage = () => {
    return (
        <div>
            <CustomerDetail />
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
export default CustomerDetailPage
