import React, { useState } from 'react'
import { dataCashoutDetail } from '@/data/data-cashout'
import Table from '@/components/core/table'
import { useTransHook } from '@/locales/hooks'
import Pagination from '@/components/core/pagination'
import { ICashoutDetail } from '@/constants/interfaces'
import './styles.scss'
import Info from './info'

const Cashout = () => {
    const { t } = useTransHook()

    const columnComponent = [
        {
            heading: 'ID',
            style: 'max-w-[120px] w-[120px] px-4',
        },
        {
            heading: t('PRODUCT_NAME'),
            style: 'min-w-[150px] px-0',
        },
        {
            heading: t('CUSTOMER_NAME'),
            style: 'min-w-[120px] px-0',
        },
        {
            heading: t('QUANTITY'),
            style: 'min-w-[170px] px-0',
        },
        {
            heading: t('TOTAL_REVENUE'),
            style: 'min-w-[170px] px-0',
        },
    ]

    const renderRow = (data: ICashoutDetail, index: number) => {
        return (
            <tr key={index} className="cashout-detail">
                <td className="px-4">{data.id}</td>
                <td>
                    <div className="flex gap-2 flex-center">
                        <img
                            src={data.image}
                            alt=""
                            className="w-10 flex-shrink-0"
                        />
                        <div>{data.name}</div>
                    </div>
                </td>
                <td>{data.customer}</td>
                <td>{data.quantity}</td>
                <td>{data.totalAmount}</td>
            </tr>
        )
    }

    const [currentPage, setCurrentPage] = useState(1)

    return (
        <div>
            <h1 className="font-medium text-2xl ">Lang SOS</h1>
            <div>
                <Info />
            </div>
            <div className="shadow-30 rounded-2xl overflow-hidden pb-6 mb-24">
                <Table
                    columns={columnComponent}
                    data={dataCashoutDetail}
                    renderRow={renderRow}
                />
                <div className="p-8">
                    <Pagination
                        totalPage={10}
                        currentPage={currentPage}
                        onClick={setCurrentPage}
                    />
                </div>
            </div>
        </div>
    )
}

export default Cashout
