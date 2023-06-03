import { CourseNameLabel } from './types'

export interface CourseDetailIncludeList {
    duration: string
    resource: string
    assignments: string
    certificate: string
    lifetimeAccess: string
    device: string
    articles: string
    exercise: string
}
export interface CourseDetail {
    _id: string
    owner: string
    name: string
    overview: string
    description: string
    price: string
    rating: number
    review: number
    students: number
    language: string
    finalTest: number
    createdAt: string
    updatedAt: string
    approved: boolean
    category: number
    thumbnail: string
    promotionalVideo: string
    requirements: string[]
    goals: string[]
    include: CourseDetailIncludeList
}
export interface CourseInfo_Preview {
    id: number
    thumbnail: string
    title: string
    author: string
    ratingScore: number
    ratings: string
    price: string
    isBestseller: boolean
    category: CourseNameLabel
}

export interface Category {
    _id: string
    name: string
    slug: string
    banner: string
    thumbnail: string
    color: string
    __v: number
    createdAt: string
    updatedAt: string
}

export interface Rating {
    _id: number
    user: number
    courseId: number
    rating: number
    comment: string
    createdAt: string
    updatedAt: string
}
