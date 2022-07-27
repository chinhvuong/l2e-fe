import React, { useState } from 'react'
import './styles.scss'
import Table from '@/components/core/table'
import { dataProducts } from '@/data/data-product'
import { IProduct } from '@/contants/interfaces'
import { useTransHook } from '@/locales/hooks'
import OrderStatus from '@/components/common/status-order'
import Button from '@/components/core/button'
import EditIcon from '@/public/svgs/edit-2.svg'
import TrashIcon from '@/public/svgs/trash.svg'
import Filter from '@/components/common/filter'
import { EStatusOrder } from '@/contants/common'
import Pagination from '@/components/core/pagination'

import ArrowRight from '@/public/svgs/arrow-right.svg'
const Products = () => {
    const { t } = useTransHook()

    const columnComponent = [
        {
            heading: t('PRODUCT_NAME'),
            value: 'id',
            style: 'min-w-[220px] text-left px-4',
        },
        {
            heading: t('CATEGORY'),
            value: 'name',
            style: 'min-w-[200px] px-0',
        },
        {
            heading: t('STATUS'),
            value: 'state',
            style: 'min-w-[140px] px-0',
        },
        {
            heading: t('PRICE'),
            value: 'total',
            style: 'min-w-[80px] px-0',
        },
        {
            heading: t('CASHOUT'),
            value: 'cashout',
            style: 'min-w-[120px] px-0',
        },
        {
            heading: t('ACTIVITY'),
            value: '',
            style: 'min-w-[170px] px-0',
        },
    ]

    const renderRow = (data: IProduct, index: number) => {
        return (
            <tr key={index} className="table-product__row py-6">
                <td>
                    <div className="flex gap-1 align-middle">
                        <div className="flex-center p-4 flex-shrink-0">
                            <img
                                src={data.image}
                                alt=""
                                className="w-[55px] h-[55px] object-cover"
                            />
                        </div>
                        <p className="flex-center">{data.name}</p>
                    </div>
                </td>
                <td>{data.category}</td>
                <td>
                    <div className="px-4">
                        <OrderStatus type={data.status} />
                    </div>
                </td>
                <td>{data.price}</td>
                <td>{data.cashout}</td>
                <td>
                    <Button className="mx-1 rounded px-2 py-1">
                        <div className="flex-center gap-1">
                            <div>
                                <EditIcon />
                            </div>
                            <div className="text-white text-sm font-normal">
                                {t('EDIT')}
                            </div>
                        </div>
                    </Button>
                    <Button className="mx-1 rounded !bg-white px-2 py-1 ">
                        <div className="flex-center gap-1 text-pri">
                            <div className="text-pri">
                                <TrashIcon />
                            </div>
                            <div className="text-pri text-sm font-normal ">
                                {t('DELETE')}
                            </div>
                        </div>
                    </Button>
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

    const handleGoBack = () => {
        console.log('ok')
        const sidebar = document.getElementById('SideBar')
        const main = document.getElementById('Main')

        if (sidebar && main) {
            // main.classList.remove('app-transition')

            main.classList.add('app-transition-out')
            // main.classList.add('-right-full')
        }
    }

    return (
        <div>
            <div className="heading--wrap">
                <div>
                    <h2 className="heading-3 md-heading-collapse mb-3 sm:flex sm:mb-8">
                        <div
                            className="hidden rotate-180 sm:block my-auto pl-2"
                            onClick={handleGoBack}
                        >
                            <ArrowRight />
                        </div>
                        {t('PRODUCT_LIST')}
                    </h2>
                    <div className="text-sm leading-6 mb-6 sm:hidden">
                        {t('ALL_ORDERS')} 30
                    </div>
                </div>
                <div className="flex-center">
                    <Button className="button-adding">
                        {t('ADD_NEW_PRODUCT')}
                    </Button>
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
                    data={dataProducts}
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

export default Products
