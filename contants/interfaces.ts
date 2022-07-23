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
    status: number
    total: string
    cashout: string
    date: string
}

export interface IProduct {
    name: string
    category: string
    status: number
    price: string
    cashout: string
    image: string
}
