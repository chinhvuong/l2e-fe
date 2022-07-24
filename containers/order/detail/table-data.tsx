import React from 'react'
import Table from '@/components/core/table'

import { useTransHook } from '@/locales/hooks'

const ProductName = ({ name, image }: { name: string; image: string }) => {
    return (
        <div className="flex gap-4 align-middle">
            <div className="flex-center p-2 flex-shrink-0">
                <img src={image} alt="" className="w-10" />
            </div>
            <p className="flex-center">{name}</p>
        </div>
    )
}

const renderRow = (data: any, index: number) => {
    return (
        <tr key={index} className="first:border-0">
            <td className="text-left">
                <ProductName name={data.name} image={data.image} />
            </td>
            <td className="text-center">{data.quantity}</td>
            <td className="text-center">{data.cashout}</td>
            <td className="text-center">{data.price}</td>
            <td className="text-center">{data.total}</td>
        </tr>
    )
}

type Props = {
    data: any[]
}

function TableData({ data }: Props) {
    const { t } = useTransHook()

    const columnComponent = [
        {
            heading: t('PRODUCT_NAME'),
            style: 'text-left min-w-[250px]',
        },
        {
            heading: t('QUANTITY'),
            style: '',
        },

        {
            heading: t('CASHOUT'),
            style: '',
        },
        {
            heading: t('PRICE'),
            value: 'price',
            style: '',
        },
        {
            heading: t('PAYMENT'),
            value: 'total',
            style: '',
        },
    ]

    return (
        <div className="shadow-30 rounded-2xl overflow-hidden pb-2 mb-6">
            <Table
                columns={columnComponent}
                data={data}
                renderRow={renderRow}
            />
        </div>
    )
}

export default TableData
