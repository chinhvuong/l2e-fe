import React from 'react'
import { Column } from '@/contants/common'
import './styles.scss'

type Props = {
    row: any
    col: Column[]
    // eslint-disable-next-line no-unused-vars
    renderColumn: (data: any, col: any) => JSX.Element
}

const TableBodyRow = ({ row, col, renderColumn }: Props) => {
    return (
        <>
            <tr className="row--table">
                {col.map((item, index) => {
                    return (
                        <td key={index} className={item.style}>
                            {renderColumn(row, item.value)}
                        </td>
                    )
                })}
            </tr>
        </>
    )
}

export default TableBodyRow
