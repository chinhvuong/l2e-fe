import { CourseDetail, Rating } from '@/constants/interfaces'

export type CourseDetailState = {
    courseDetail: CourseDetail
    reviews: Rating[]
}

export type TInputUpdate = {
    id: string
    content: string
}
