import React from 'react'
import './style.scss'
import TableHeadItem from './table-head-item'
import { Column } from '@/contants/interfaces'

type Props = {
    columns: Column[]
    data: any[]
    // eslint-disable-next-line no-unused-vars
    renderRow: (data: any, index: number) => JSX.Element
}

function Table({ columns, data, renderRow }: Props) {
    const columnsHeading = columns.map((column) => {
        column.style = column.style ? column.style : 'text-center'
        return column
    })

    return (
        <div className="scrollbar-horizontal">
            <table className="table">
                <thead>
                    <tr className="thead-table">
                        {columns.map((item, index) => (
                            <TableHeadItem
                                key={index}
                                item={item.heading}
                                styleItem={columnsHeading[index].style}
                            />
                        ))}
                    </tr>
                </thead>
                <tbody>{data.map((row, index) => renderRow(row, index))}</tbody>
            </table>
        </div>
    )
}

export default Table
