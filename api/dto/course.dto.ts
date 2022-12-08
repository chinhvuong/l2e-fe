import { CourseDetail } from '@/store/course/types'

export interface CreateCourseRequest {
    name: string
    category: string
}

export interface CreateCourseResponse {
    owner: string
    author: string
    name: string
    overview: string
    description: string
    price: number
    rating: number
    reviews: number
    students: number
    language: string
    approved: boolean
    requirements: string[]
    goals: string[]
    thumbnail: string | null
    category: string
    _id: string
    createdAt: string
    updatedAt: string
    __v: number
}

export interface UpdateCourseRequest {
    _id: string
    name: string
    overview: string
    description: string
    price: number
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
}

export interface UpdateCourseResponse {
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
    _id: string
    owner: string
    author: string
    name: string
    overview: string
    description: string
    price: number
    rating: number
    reviews: number
    students: number
    language: string
    approved: false
    requirements: string
    goals: string
    thumbnail: string | null
    category: string
    createdAt: string
    updatedAt: string
    __v: number
}

type Category = {
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
export interface GetCategoryResponse {
    total: number
    data: Category[]
}

export interface GetCourseDetailResponse {
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
    _id: string
    owner: string
    author: string
    name: string
    overview: string
    description: string
    price: number
    rating: number
    reviews: number
    students: number
    language: string
    approved: false
    requirements: string
    goals: string
    thumbnail: string | null
    category: string
    createdAt: string
    updatedAt: string
    __v: number
}

export type CoursePreview = {
    _id: string
    name: string
    price: number
    rating: number
    students: number
    courseId?: number
    approved: boolean
    author: {
        _id: string
        __v: number
        avatar: string | null
        bio: string | null
        createdAt: string
        name: string | null
        nonce: number
        rating: number
        title: string | null
        updatedAt: string
        walletAddress: string
    }
    category: Category
    ratingCount: number
}

export interface GetAllCoursesResponse {
    total: number
    data: CoursePreview[]
}

export interface GetAllMyCoursesResponse {
    total: number
    data: CourseDetail[]
}

export interface GetMintSignatureResponse {
    price: string
    v: number
    r: string
    s: string
    nonce: number
}
export interface GetMintSignatureResponse {
    price: string
    v: number
    r: string
    s: string
    nonce: number
}
