import React from 'react'
import Table from '@/components/core/table'
import { IDetailOrder } from '@/contants/common'
import './style.scss'
import { dataOrderDetails } from '@/data/detail-order'

const columnComponent = [
    {
        heading: 'Tên sản phẩm',
        value: 'name,image',
        style: 'text-left',
    },
    {
        heading: 'Số lượng',
        value: 'quantity',
        style: '',
    },

    {
        heading: 'Cashout',
        value: 'cashout',
        style: '',
    },
    {
        heading: 'Giá',
        value: 'price',
        style: '',
    },
    {
        heading: 'Thành tiền',
        value: 'total',
        style: '',
    },
]

const ProductName = ({ name, image }: { name: string; image: string }) => {
    return (
        <div className="details-order-name">
            <div className="flex-center p-2">
                <img src={image} alt="" className="w-10" />
            </div>
            <p className="flex-center">{name}</p>
        </div>
    )
}

const renderRow = (data: IDetailOrder, index: number) => {
    return (
        <tr key={index}>
            <td>
                <ProductName name={data.name} image={data.image} />
            </td>
            <td>{data.quantity}</td>
            <td>{data.cashout}</td>
            <td>{data.price}</td>
            <td>{data.total}</td>
        </tr>
    )
}

const Order = () => {
    return (
        <div>
            {/* <Table columns={columns} data={dataColumn} /> */}
            <div className="cart-order">
                <Table
                    columns={columnComponent}
                    data={dataOrderDetails}
                    renderRow={renderRow}
                />
            </div>
        </div>
    )
}

export default Order
