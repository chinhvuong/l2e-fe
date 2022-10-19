import { CourseDetail, Rating } from '@/constants/interfaces'

export type TInputUpdate = {
    id: string
    content: string
}

export type TInput = {
    id: string
    placeholder: string
    content: string
}

export type CourseDetailState = {
    courseDetail: CourseDetail
    whatYouWillLearn: TInput[]
    requirements: TInput[]
    intendedLearners: TInput[]
    reviews: Rating[]
}
