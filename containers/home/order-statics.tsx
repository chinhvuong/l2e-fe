import React from 'react'
import Table from '@/components/core/table'
import { useTransHook } from '@/locales/hooks'

const OrderStatics = () => {
    const { t } = useTransHook()
    const collumns = [
        {
            heading: t('ORDER'),
            style: 'text-left min-w-[100px]',
            value: 'quantity',
        },
        {
            heading: t('QUANTITY'),
            value: 'quantity',
            style: '',
        },

        {
            heading: t('REVENUE'),
            value: 'revenue',
            style: '',
        },
    ]
    const data = [
        {
            title: 'NEW',
            quantity: 10,
            revenue: 200000,
        },
        {
            title: 'DELIVERED',
            quantity: 10,
            revenue: 200000,
        },
        {
            title: 'SUCCESS',
            quantity: 10,
            revenue: 200000,
        },
        {
            title: 'FAILED',
            quantity: 10,
            revenue: 200000,
        },
        {
            title: 'TOTAL',
            quantity: 10,
            revenue: 200000,
        },
    ]

    const renderRow = (data: any, key: number) => (
        <tr key={key} className="last:font-semibold first:border-0">
            <td className="text-left">{data.title}</td>
            <td className="text-center">{data.quantity}</td>
            <td className="text-center">{data.revenue}</td>
        </tr>
    )
    return (
        <div className="shadow-30 rounded-2xl overflow-hidden pb-6">
            <Table columns={collumns} data={data} renderRow={renderRow} />
        </div>
    )
}

export default OrderStatics
