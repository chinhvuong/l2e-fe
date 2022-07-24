import React, { useState } from 'react'
import Table from '@/components/core/table'
import { dataCanceledOrder } from '@/data/data-order'
import { ICanceledOrder } from '@/contants/interfaces'
import { useTransHook } from '@/locales/hooks'
import './styles.scss'
import OrderStatus from '@/components/common/status-order'
import Pagination from '@/components/core/pagination'
import { EStatusOrder } from '@/contants/common'
import Filter from '@/components/common/filter'

const CanceledOrders = () => {
    const { t } = useTransHook()

    const columnComponent = [
        {
            heading: 'ID',
            style: 'w-[5px] px-0',
        },
        {
            heading: t('CUSTOMER'),
            style: 'min-w-[150px] px-0',
        },
        {
            heading: t('STATUS'),
            style: 'min-w-[130px] px-0',
        },
        {
            heading: t('TOTAL_AMOUNT'),
            style: 'min-w-[120px] px-0',
        },
        {
            heading: t('CASHOUT'),
            style: 'min-w-[140px] px-0',
        },
        {
            heading: t('ACTIVITY'),
            style: 'min-w-[170px] px-0',
        },
    ]

    const renderRow = (data: ICanceledOrder, index: number) => {
        return (
            <tr key={index} className="cancel-order">
                <td>
                    <div>{data.id}</div>
                    <div className="text-black-50">{data.date}</div>
                </td>
                <td>{data.name}</td>
                <td>
                    <div>
                        <OrderStatus type={data.status} className="py-1" />
                    </div>
                </td>
                <td>{data.total}</td>
                <td>{data.cashout}</td>
                <td>
                    <button className="shadow-sm bg-white text-pri ">
                        <div className="underline decoration-pri-1 hover:text-pri/95 text-pri text-sm">
                            {t('SHOW_DETAIL')}
                        </div>
                    </button>
                </td>
            </tr>
        )
    }

    const [textSearch, setTextSearch] = useState('')
    const [currentPage, setCurrentPage] = useState(1)

    const [status, setStatus] = useState(-1)
    const [category, setCategory] = useState(-1)

    const selectLeft = {
        title: 'Danh mục',
        value: status,
        data: ['abc', 'def'],
        setValue: setStatus,
    }
    const selectRight = {
        title: 'Trạng thái',
        value: category,
        data: Object.values(EStatusOrder).map((item) => t(item)),
        setValue: setCategory,
    }

    return (
        <div>
            <h1 className="font-medium text-2xl mb-4">
                {t('CANCELED_ORDERS')}
            </h1>
            {textSearch}
            <div className="px-6 py-6 mb-8 filter-form">
                <Filter
                    onPressSearch={setTextSearch}
                    selectLeft={selectLeft}
                    selectRight={selectRight}
                />
            </div>
            <div className="shadow-30 rounded-2xl overflow-hidden pb-6  mb-24">
                <Table
                    columns={columnComponent}
                    data={dataCanceledOrder}
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

export default CanceledOrders
