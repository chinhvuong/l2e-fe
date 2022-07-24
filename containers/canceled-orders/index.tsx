import React from 'react'
import Table from '@/components/core/table'
import { dataCanceledOrder } from '@/data/data-order'
import { ICanceledOrder } from '@/contants/interfaces'
import { useTransHook } from '@/locales/hooks'
import './styles.scss'
import OrderStatus from '@/components/common/status-order'
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

    return (
        <div className={`max-w-[970px]`}>
            <Table
                columns={columnComponent}
                data={dataCanceledOrder}
                renderRow={renderRow}
            />
        </div>
    )
}

export default CanceledOrders
