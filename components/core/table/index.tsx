import React from 'react'
import './style.scss'
import TableHeadItem from './table-head-item'
import TableRow from './table-body-item'
import { ComponentType } from '@/contants/common'
interface Column {
    heading: string
    value: string
    style: string
    type: ComponentType
}

type Props = {
    columns: Column[]
    data: any[]
}

function Table({ columns, data }: Props) {
    return (
        <table>
            <thead>
                <tr>
                    {columns.map((item, index) => (
                        <TableHeadItem key={index} item={item.heading} />
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, index) => (
                    <TableRow key={index} row={row} col={columns} />
                ))}
            </tbody>
        </table>
    )
}

export default Table
