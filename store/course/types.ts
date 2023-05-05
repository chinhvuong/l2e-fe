import { CourseDetailIncludeList, Rating } from '@/constants/interfaces'
import { QuizDetailType } from '../quiz/types'
import { User } from '../user/types'
export interface CourseNestedLecture {
    name: string
    description: string
    mediaType: 'video'
    media: string
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
    author: User
    finalTest?: QuizDetailType
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
    promotionalVideo: string | null
    include: CourseDetailIncludeList
    category: string
    __v: number
    createdAt: string
    updatedAt: string
    courseId?: number
    sections: CourseSectionWithLectures[]
    lastApproveRequestAt: string | null
}

export type CourseDetailState = {
    courseDetail: CourseDetail
    reviews: Rating[]
    isEnroll: boolean
    isSaved: boolean
    isLoading: boolean
    canSaveCourse: boolean
    canCreateCourse: boolean
    descriptionLength: number
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
