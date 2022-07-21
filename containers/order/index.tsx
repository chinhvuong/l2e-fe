import React from 'react'
import Table from '@/components/core/table'
import { ComponentType } from '@/contants/common'

const columns = [
    {
        heading: 'Tên sản phẩm',
        value: 'name',
        style: '',
        type: ComponentType.normal,
    },
    {
        heading: 'Tổng đơn hàng',
        value: 'total',
        style: '',
        type: ComponentType.normal,
    },
    {
        heading: 'Cashout',
        value: 'cashout',
        style: '',
        type: ComponentType.normal,
    },
    {
        heading: 'Trạng thái',
        value: 'state',
        style: '',
        type: ComponentType.normal,
    },
    {
        heading: 'Hoạt động',
        value: 'status',
        style: '',
        type: ComponentType.component,
    },
]

const dataColumn = [
    {
        name: 'currency',
        total: 0,
        cashout: 'làng SOS',
        state: 'Đang giao',
        status: <div>abc</div>,
    },
    {
        name: 'currency',
        total: 0,
        cashout: 'làng SOS',
        state: 'Đang giao',
        status: <div>abc</div>,
    },
    {
        name: 'currency',
        total: 0,
        cashout: 'làng SOS',
        state: 'Đang giao',
        status: <div>abc</div>,
    },
    {
        name: 'currency',
        total: 0,
        cashout: 'làng SOS',
        state: 'Đang giao',
        status: <div>abc</div>,
    },
]

const Order = () => {
    return (
        <div>
            <Table columns={columns} data={dataColumn} />
        </div>
    )
}

export default Order
