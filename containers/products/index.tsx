import React, { useState } from 'react'
import Table from '@/components/core/table'
import { dataProducts } from '@/data/data-product'
import { IProduct } from '@/contants/interfaces'
import { useTransHook } from '@/locales/hooks'
import './styles.scss'
import OrderStatus from '@/components/common/status-order'
import Button from '@/components/core/button'
import EditIcon from '@/public/svgs/edit-2.svg'
import TrashIcon from '@/public/svgs/trash.svg'
import Select from '@/components/core/select'
import { EStatusOrder } from '@/contants/common'
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
                        <div className="flex-center gap-1">
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

    const [value, setValue] = useState(-1)

    const handleClickItem = (index: number) => {
        setValue(index)
    }

    const renderItemSelect = (data: string, index: number) => {
        if (index === -1) {
            return (
                <div
                    className="hover:bg-slate-400 px-4 py-3 rounded shadow-40-08 border-2"
                    onClick={() => handleClickItem(index)}
                >
                    Tất cả
                </div>
            )
        } else {
            return (
                <div
                    key={index}
                    className={`hover:bg-pri-6-1 hover:text-white px-4 py-3 rounded shadow-40-08 border-2 ${
                        value === index ? 'bg-pri text-white' : ''
                    }`}
                    onClick={() => handleClickItem(index)}
                >
                    {data}
                </div>
            )
        }
    }

    return (
        <div>
            <div className="max-w-[155px]">
                <Select
                    currentValue={value}
                    title="Trạng thái"
                    data={Object.values(EStatusOrder).map((item) => t(item))}
                    renderItem={renderItemSelect}
                />
            </div>
            <div className={`max-w-[970px]`}>
                <Table
                    columns={columnComponent}
                    data={dataProducts}
                    renderRow={renderRow}
                />
            </div>
        </div>
    )
}

export default Products
