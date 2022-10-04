import React, { useState } from 'react'
import './styles.scss'
import Table from '@/components/core/table'
import { dataCustomer } from '@/data/data-customer'
import { ICustomer } from '@/constants/interfaces'
import { useTransHook } from '@/locales/hooks'
import Button from '@/components/core/button'
import TrashIcon from '@/public/svgs/trash.svg'
import Pagination from '@/components/core/pagination'
import Searchbox from '@/components/common/search-box'

import ArrowRight from '@/public/svgs/arrow-right.svg'
const Customer = () => {
    const { t } = useTransHook()

    const columnComponent = [
        {
            heading: t('CUSTOMER_NAME'),
            value: 'id',
            style: 'min-w-[190px] text-left px-6',
        },
        {
            heading: t('TOTAL_ORDER_AMOUNT'),
            value: 'name',
            style: 'min-w-[160px] px-0',
        },
        {
            heading: t('LAST_ORDER_DATE'),
            value: 'state',
            style: 'min-w-[170px] px-0',
        },
        {
            heading: t('ACTIVITY'),
            value: '',
            style: 'min-w-[160px] px-0',
        },
    ]

    const renderRow = (data: ICustomer, index: number) => {
        return (
            <tr key={index} className="table-customer__row py-6">
                <td>
                    <div className="flex gap-1 align-middle">
                        <div className="flex-center p-4 pl-6 flex-shrink-0">
                            <img
                                src={data.avatar}
                                alt=""
                                className="w-[55px] h-[55px] object-cover"
                            />
                        </div>
                        <p className="flex-center">{data.name}</p>
                    </div>
                </td>
                <td>{data.totalOrderAmount}</td>
                <td>{data.lastOrderDate}</td>
                <td>
                    <div className="flex flex-center">
                        <button className="shadow-sm bg-white text-pri mr-2">
                            <div className="underline decoration-pri-1 hover:text-pri/95 text-pri text-sm">
                                {t('SHOW_DETAIL')}
                            </div>
                        </button>
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
                    </div>
                </td>
            </tr>
        )
    }

    const [textSearch, setTextSearch] = useState('')
    const [currentPage, setCurrentPage] = useState(1)

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
            <div className="heading--wrap flex justify-between mb-10">
                <div>
                    <h2 className="heading-3 md-heading-collapse mb-3 sm:flex sm:mb-8">
                        <div
                            className="hidden rotate-180 sm:block my-auto pl-2"
                            onClick={handleGoBack}
                        >
                            <ArrowRight />
                        </div>
                        {t('CUSTOMER_LIST')}
                    </h2>
                </div>
                <div className="w-[400px]">
                    <Searchbox
                        onPressSearch={setTextSearch}
                        placeholder={t('ENTER_CUSTOMER_NAME')}
                    />
                </div>
            </div>
            {textSearch}

            <div className="shadow-30 rounded-2xl overflow-hidden pb-6 mb-24">
                <Table
                    columns={columnComponent}
                    data={dataCustomer}
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

export default Customer
