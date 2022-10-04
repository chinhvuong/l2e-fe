import React, { useState } from 'react'
import Table from '@/components/core/table'
import { IOrder } from '@/constants/interfaces'
import './style.scss'
import { dataOrderList } from '@/data/data-order'
import Filter from '@/components/common/filter'
import { useTransHook } from '@/locales/hooks'
import { EStatusOrder } from '@/constants/common'
import Pagination from '@/components/core/pagination'
import OrderStatus from '@/components/common/status-order'
const ProductName = ({ name, image }: { name: string; image: string }) => {
    return (
        <div className="details-order-name">
            <div className="flex-center p-2 flex-shrink-0">
                <img src={image} alt="" className="w-10" />
            </div>
            <p className="flex-center">{name}</p>
        </div>
    )
}

const Order = () => {
    const { t } = useTransHook()

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

    const columnComponent = [
        {
            heading: 'ID',
            style: 'w-[5px] px-0',
        },
        {
            heading: t('PRODUCT_NAME'),
            style: 'text-left min-w-[150px] px-0',
        },
        {
            heading: t('CUSTOMER'),
            style: 'min-w-[150px] px-0',
        },
        {
            heading: t('TOTAL_AMOUNT'),
            style: 'min-w-[120px] px-0',
        },
        {
            heading: t('STATUS'),
            style: 'min-w-[130px] px-0',
        },
        {
            heading: t('ACTIVITY'),
            style: 'min-w-[170px] px-0',
        },
    ]
    const renderRow = (data: IOrder, index: number) => {
        return (
            <tr key={index} className="order-list">
                <td>
                    <div>{data.id}</div>
                    <div className="text-black-50">{data.date}</div>
                </td>
                <td className="text-left pl-0">
                    <ProductName name={data.name} image={data.image} />
                </td>
                <td>{data.customer}</td>
                <td>{data.total}</td>
                <td>
                    <div>
                        <OrderStatus type={data.status} className="py-1" />
                    </div>
                </td>
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
        <div>
            <div className="heading--wrap">
                <div>
                    <h2 className="heading-3 md-heading-collapse mb-3">
                        {t('ORDER_LIST')}
                    </h2>
                    <div className="text-sm leading-6 mb-6">
                        {t('ALL_ORDERS')} 30
                    </div>
                </div>
            </div>
            {textSearch}
            <div className="filter-form">
                <Filter
                    onPressSearch={setTextSearch}
                    selectLeft={selectLeft}
                    selectRight={selectRight}
                />
            </div>

            <div className="shadow-30 rounded-2xl overflow-hidden pb-6 mb-24">
                <Table
                    columns={columnComponent}
                    data={dataOrderList}
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

export default Order
