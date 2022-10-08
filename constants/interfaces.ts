import { Category } from './types'

export interface CourseDetail {
    info: CourseInfo
}

export interface CourseInfo {
    id: number
    thumbnail: string
    title: string
    description: string
    authors: string[]
    ratingScore: number
    ratings: string
    students: string
    price: string
    isBestseller: boolean
    category: Category
    lastUpdated: Date
    language: string
    captions: string[]
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
