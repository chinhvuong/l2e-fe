import { Rating } from '@/constants/interfaces'
export interface CourseNestedLecture {
    name: string
    description: string
    mediaType: 'video'
}
export interface CourseSectionWithLectures {
    _id: string
    name: string
    description: string
    order: number
    lessons: CourseNestedLecture[]
}

export interface CourseDetail {
    _id: string
    owner: string
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
    name: string
    overview: string
    description: string
    price: number
    rating: number | null
    reviews: number | null
    students: number | null
    language: string
    approved: boolean
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
    __v: number
    createdAt: string
    updatedAt: string
    courseId?: number
    sections: CourseSectionWithLectures[]
}

export type CourseDetailState = {
    courseDetail: CourseDetail
    reviews: Rating[]
    isNewData: boolean
    isEnroll: boolean
    isSaved: boolean
    canCreateCourse: boolean
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

export interface ICourseBasicInfo {
    _id: string
    name: string
    category: string
}
