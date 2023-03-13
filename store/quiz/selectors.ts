import { RootState } from '@/store'
import { QuizDetailType } from './types'
import { QuestionDetailType } from '@/store/questions/types'
export const getQuizDetailInfo = (state: RootState) => {
    return state.quizDetail.quizDetail
}
export const getQuestionsFromQuiz = (state: RootState) => {
    const newList: QuestionDetailType[] = []
    if (state.quizDetail.quizDetail.questions.length !== 0) {
        state.quizDetail.quizDetail.questions.forEach((item) => {
            newList.push(item)
        })
    }
    return newList
}
export const getCourseIdQuiz = (state: RootState) => {
    return state.quizDetail.quizDetail.courseId
}
export const getQuestionsForQuiz = (state: RootState) => {
    const newList: QuestionDetailType[] = []
    if (state.quizDetail.questionsList.length !== 0) {
        state.quizDetail.questionsList.forEach((item) => {
            newList.push(item)
        })
    }
    return newList
}
export const getQuestionsIdFromQuiz = (state: RootState) => {
    const newList: string[] = []
    if (state.quizDetail.quizDetail.questions.length !== 0) {
        state.quizDetail.quizDetail.questions.forEach((item) => {
            newList.push(item._id)
        })
    }
    return newList
}
