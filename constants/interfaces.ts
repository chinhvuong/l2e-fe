import { CourseNameLabel } from './types'

export interface CourseDetail {
    _id: number
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
    createdAt: Date
    updatedAt: Date
    approved: boolean
    category: number
    thumbnail: string
    requirements: string[]
    goals: string[]
    include: {
        duration: string
        resource: string
        assignments: string
        certificate: string
        lifetimeAccess: string
        device: string
        articles: string
        exercise: string
    }
    isBestseller: boolean
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
    _id: number
    name: CourseNameLabel
    banner: string
    thumbnail: string
    createdAt: Date
    updatedAt: Date
}

export interface User {
    _id: number
    walletAddress: string
    createdAt: Date
    updatedAt: Date
    name: string
    title: string
    bio: string
    rating: number
    courses: number[]
    avatar: string
}

export interface Rating {
    _id: number
    user: number
    courseId: number
    rating: number
    comment: string
    createdAt: Date
    updatedAt: Date
}
