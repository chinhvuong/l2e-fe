import { QuestionDetailType } from '../questions/types'
export interface QuizDetailType {
    _id: string
    questions: QuestionDetailType[]
    courseId: string
    name: string
    createdAt: string
    updatedAt: string
}

export interface QuizSelectType {
    label: string
    value: string
}
