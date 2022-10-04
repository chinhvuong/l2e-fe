import React, { useState } from 'react'
import { dataCashout } from '@/data/data-cashout'
import Table from '@/components/core/table'
import { useTransHook } from '@/locales/hooks'
import Pagination from '@/components/core/pagination'
import { ICashout } from '@/constants/interfaces'
import './styles.scss'
import Info from './info'
import Router from 'next/router'

const Cashout = () => {
    const { t } = useTransHook()

    const columnComponent = [
        {
            heading: t('FUND_CASHOUT'),
            style: 'max-w-[180px] w-[200px] px-4',
        },
        {
            heading: t('LASTEST_BILLING_DATE'),
            style: 'min-w-[150px] px-0',
        },
        {
            heading: t('VALUE'),
            style: 'min-w-[120px] px-0',
        },
        {
            heading: t('ACTIVITY'),
            style: 'min-w-[170px] px-0',
        },
    ]

    const showDetail = () => {
        Router.push('cashout/1')
    }

    const renderRow = (data: ICashout, index: number) => {
        return (
            <tr key={index} className="cashout">
                <td className="px-4">
                    <div className="flex gap-2 flex-center">
                        <img
                            src={data.image}
                            alt=""
                            className="w-10 flex-shrink-0"
                        />
                        <div>{data.cashout}</div>
                    </div>
                </td>
                <td>{data.lastDate}</td>
                <td>{data.value}</td>
                <td>
                    <button className="shadow-sm bg-white text-pri ">
                        <div
                            className="underline decoration-pri-1 hover:text-pri/95 text-pri text-sm"
                            onClick={showDetail}
                        >
                            {t('SHOW_DETAIL')}
                        </div>
                    </button>
                </td>
            </tr>
        )
    }

    const [currentPage, setCurrentPage] = useState(1)

    return (
        <div>
            <h1 className="font-medium text-2xl mb-4">{t('MANAGE_FUNDS')}</h1>
            <div>
                <Info />
            </div>
            <div className="shadow-30 rounded-2xl overflow-hidden pb-6  mb-24">
                <Table
                    columns={columnComponent}
                    data={dataCashout}
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
