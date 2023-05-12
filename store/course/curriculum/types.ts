import { QuizDetailType } from '@/store/quiz/types'

export type CourseCurriculumState = {
    sections: CurriculumSection[]
    lectures: CurriculumLecture[][]
}

export type CurriculumSection = {
    _id: string
    courseId: string
    name: string
    description: string
}

export type CurriculumLecture = {
    _id: string
    name: string
    description: string
    media: string
    mediaName: string
    mediaType: string
    quizzes: QuizDetailType[]
    sectionId: string
    mode: string
    isLoading: boolean
}

export type TInputUpdateLecture = {
    sectionId: string
    id: string
    content: string
}

export type DeleteLecture = {
    sectionId: string
    index: number
}
