import { CourseDetail, Rating } from '@/constants/interfaces'

export type TWhatYouWillLearn = {
    id: number
    placeholder: string
    content: string
}

export type TWhatYouWillLearnUpdate = {
    id: number
    content: string
}

export type CourseDetailState = {
    courseDetail: CourseDetail
    whatYouWillLearn: TWhatYouWillLearn[]
    reviews: Rating[]
}
