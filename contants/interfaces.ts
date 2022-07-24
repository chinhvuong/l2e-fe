import { EStatusOrder } from './common'

export interface Column {
    heading: string | JSX.Element
    style: string
}

export interface IDetailOrder {
    name: string
    image: string
    quantity: number
    cashout: string
    price: string
    total: string
}

export interface ICanceledOrder {
    id: string
    name: string
    status: typeof EStatusOrder
    total: string
    cashout: string
    date: string
}

export interface IProduct {
    name: string
    category: string
    status: typeof EStatusOrder
    price: string
    cashout: string
    image: string
}
