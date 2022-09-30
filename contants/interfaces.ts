import { EStatusOrder } from './common'
import { Category } from './types'

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

export interface IOrder {
    id: string
    date: string
    image: string
    name: string
    customer: string
    total: string
    status: typeof EStatusOrder
}

export interface ICustomer {
    name: string
    avatar: string
    lastOrderDate: string
    totalOrderAmount: string
}

export interface IAdress {
    location: string
    phone: string
}
export interface IOrderDetail {
    orderCode: string
    time: string
    price: string
    quantity: number
    image: string
    name: string
    status: typeof EStatusOrder
}
export interface ICustomerDetail {
    name: string
    avgOrderPrice: string
    cumulativeRevenue: string
    totalOrder: number
    avatar: string
    orders: IOrderDetail[]
    lastOrderDate: string
    address: IAdress[]
}

export interface ICashout {
    cashout: string
    image: string
    lastDate: string
    value: string
}

export interface ICashoutDetail {
    id: string
    name: string
    date: string
    image: string
    quantity: number
    customer: string
    totalAmount: string
}

export interface CourseDetail {
    info: CourseInfo
}

export interface CourseInfo {
    id: number
    thumbnail: string
    title: string
    description: string
    authors: string
    ratingScore: number
    ratings: string
    students: string
    price: string
    isBestseller: boolean
    category: Category
    lastUpdated: Date
    language: string
    captions: string
}

export interface CourseInfo_Preview {
    id: number
    thumbnail: string
    title: string
    authors: string
    ratingScore: number
    ratings: string
    price: string
    isBestseller: boolean
    category: Category
}
