import { Rating } from '@/constants/interfaces'

export interface CourseDetail {
    _id: string
    name: string
    overview: string
    description: string
    price: number
    rating: number | null
    review: number | null
    students: number | null
    language: string
    requirements: string[]
    goals: string[]
    thumbnail: string | null
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
    category: string
    updatedAt: string
}

export type CourseDetailState = {
    courseDetail: CourseDetail
    reviews: Rating[]
}

export type TInputUpdate = {
    id: string
    content: string
}

export interface CourseLandingPage {
    name?: string
    overview?: string
    description?: string
    price?: number
    language?: string
    thumbnail?: string
    category?: string
}
