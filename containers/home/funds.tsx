import React from 'react'
import Table from '@/components/core/table'
import { useTransHook } from '@/locales/hooks'

const data = [
    {
        total: 20000000,
        image: '/images/gvf.png',
        name: 'Green Vietnam Fund',
        id: 1,
    },
    {
        total: 20000000,
        image: '/images/gvf.png',
        name: 'Green Vietnam Fund',
        id: 2,
    },
    {
        total: 20000000,
        image: '/images/gvf.png',
        name: 'Green Vietnam Fund',
        id: 3,
    },
    {
        total: 20000000,
        image: '/images/gvf.png',
        name: 'Green Vietnam Fund',
        id: 4,
    },
    {
        total: 20000000,
        image: '/images/gvf.png',
        name: 'Tổng',
        id: 4,
    },
]
const Funds = () => {
    const { t } = useTransHook()
    const collumns = [
        {
            heading: t('FUND_CASHOUT'),
            style: 'text-left min-w-[200px]',
        },

        {
            heading: t('TOTAL_MONEY'),
            style: '',
        },
    ]

    const renderRow = (dt: any, key: number) => (
        <tr key={key} className="last:font-semibold first:border-0">
            <td className="text-left">
                <div className="flex gap-4 items-center">
                    {key !== data.length - 1 && (
                        <img
                            className="w-[50px] h-[50px] md:w-8 md:h-8"
                            src={dt.image}
                            alt=""
                        />
                    )}
                    <span>{dt.name}</span>
                </div>
            </td>
            <td className="text-center">{dt.total}</td>
        </tr>
    )
    return (
        <div className="shadow-30 rounded-2xl overflow-hidden pb-6">
            <Table columns={collumns} data={data} renderRow={renderRow} />
        </div>
    )
}

export default Funds
