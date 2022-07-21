import React from 'react'
import { ComponentType } from '@/contants/common'
interface Column {
    heading: string
    value: string
    style: string
    type: ComponentType
}
type Props = {
    row: any
    col: Column[]
}

const TableBodyRow = ({ row, col }: Props) => {
    return (
        <>
            <tr>
                {col.map((item, index) => {
                    return <td key={index}>{row[`${item.value}`]}</td>
                })}
            </tr>
        </>
    )
}

export default TableBodyRow
