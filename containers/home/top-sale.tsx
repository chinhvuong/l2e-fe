import React from 'react'
import Table from '@/components/core/table'
import { useTransHook } from '@/locales/hooks'
import { EStatusOrder } from '@/contants/common'
import StatusOrder from '@/components/common/status-order'
const data = [
    {
        code: '#01',
        quantity: 10,
        status: EStatusOrder.buying,
        image: '/images/gvf.png',
        name: 'Green Vietnam Fund',
        id: 1,
    },
    {
        code: '#01',
        quantity: 10,
        status: EStatusOrder.outStock,
        image: '/images/gvf.png',
        name: 'Green Vietnam Fund',
        id: 2,
    },
    {
        code: '#01',
        quantity: 10,
        status: EStatusOrder.outStock,
        image: '/images/gvf.png',
        name: 'Green Vietnam Fund',
        id: 3,
    },
    {
        code: '#01',
        quantity: 10,
        status: EStatusOrder.outStock,
        image: '/images/gvf.png',
        name: 'Green Vietnam Fund',
        id: 4,
    },
]
const TopSale = () => {
    const { t } = useTransHook()
    const collumns = [
        {
            heading: t('TOP_SALE'),
            style: 'text-left min-w-[150px]',
        },
        {
            heading: t('CODE'),
            style: '',
        },
        {
            heading: t('QUANTITY'),
            style: '',
        },
        {
            heading: t('STATUS'),
            style: '',
        },
    ]

    const renderRow = (dt: any, key: number) => (
        <tr key={key} className=" first:border-0">
            <td className="text-left">
                <div className="flex gap-4 items-center">
                    <img
                        className="w-[55px] h-[55px] md:w-9 md:h-9"
                        src={dt.image}
                        alt=""
                    />

                    <span>{dt.name}</span>
                </div>
            </td>
            <td className="text-center">{dt.code}</td>
            <td className="text-center">{dt.quantity}</td>
            <td className="text-center">
                <div>
                    <StatusOrder type={dt.status} />
                </div>
            </td>
        </tr>
    )
    return (
        <div className="shadow-30 rounded-2xl overflow-hidden pb-6">
            <Table columns={collumns} data={data} renderRow={renderRow} />
        </div>
    )
}

export default TopSale
