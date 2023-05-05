import { CourseDetailIncludeList } from '@/constants/interfaces'
import {
    CurriculumLecture,
    CurriculumSection,
} from '@/store/course/curriculum/types'
import { CourseSectionWithLectures } from '@/store/course/types'
import { User } from '@/store/user/types'

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

export interface CourseDetailPreview {
    _id: string
    owner: string
    name: string
    overview: string
    description: string
    price: number
    rating: number
    reviews: number
    students: number
    language: string
    approved: string
    requirements: string[]
    goals: string[]
    thumbnail: string
    promotionalVideo: string
    createdAt: string
    updatedAt: string
    include: CourseDetailIncludeList
    courseId: number
    author: User
    category: Category
    ratingCount: number
    sections: CourseSectionWithLectures[]
}

export interface GetCategoryResponse {
    total: number
    data: Category[]
}

export type CoursePreview = {
    _id: string
    name: string
    price: number
    rating: number
    students: number
    courseId?: number
    approved: boolean
    author: User
    category: Category
    ratingCount: number
    thumbnail: string
}

export interface GetAllCoursesResponse {
    total: number
    data: CoursePreview[]
}

export interface GetAllMyCoursesResponse {
    total: number
    data: CoursePreview[]
}

export interface GetAllCourseSectionsResponse {
    total: number
    data: CurriculumSection[]
}

export interface SectionRequestItem {
    name: string
    description: string
    courseId: string
}

export interface SectionResponseItem {
    courseId: string
    createdAt: string
    description: string
    name: string
    order: number
    updatedAt: string
    __v: number
    _id: string
}

export interface TSection {
    courseId: {
        name: string | null
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
        _id: string
        createdAt: string
        updatedAt: string
    }
    name: string
    description: string
    _id: string
    __v: number
    createdAt: string
    updatedAt: string
}

export interface GetAllCourseLessonsResponse {
    total: number
    data: CurriculumLecture[]
}
export interface GetAllMyEnrollCoursesResponse {
    total: number
    data: CoursePreview[]
}

export interface TLesson {
    name: string
    description: string
    media: string
    mediaName: string
    mediaType: string
    quizzes: string[]
    _id: string
    sectionId: string
}

export interface LessonRequestItem {
    name: string
    description: string
    media: string
    mediaName: string
    mediaType: string
    quizzes: string[]
    sectionId: string
}

export interface LessonResponseItem {
    sectionId: string
    name: string
    description: string
    media: string
    mediaName: string
    mediaType: string
    quizzes: string[]
    mode: string
    order: number
    _id: string
    createdAt: string
    updatedAt: string
    __v: number
}

export interface GetMintSignatureResponse {
    price: string
    v: number
    r: string
    s: string
    nonce: number
}
export interface GetMintCertificateSignatureResponse {
    courseId: number
    v: number
    r: string
    s: string
    nonce: number
}

export interface UploadOneFileResponse {
    url: string
}

export interface QuestionCreateType {
    question: string
    choices: string[]
    correctAnswer: number
    courseId: string
    medias: string[]
}

export interface QuizCreateType {
    questions: string[]
    courseId: string
    name: string
}
