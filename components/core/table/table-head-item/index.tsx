import React from 'react'

type Props = {
    item: string
}
const TableHeadItem = ({ item }: Props) => {
    return (
        <>
            <th>{item}</th>
        </>
    )
}

export default TableHeadItem
