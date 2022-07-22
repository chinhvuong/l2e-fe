import React from 'react'
import './styles.scss'

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
