import React from 'react'
import './styles.scss'

type Props = {
    item: string | JSX.Element
    styleItem: string
}

const TableHeadItem = ({ item, styleItem }: Props) => {
    return (
        <>
            <th className={styleItem}>{item}</th>
        </>
    )
}

export default TableHeadItem
