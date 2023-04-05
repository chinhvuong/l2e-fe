import { RootState } from '@/store'
import { QuizDetailType, QuizSelectType } from './types'
import { QuestionDetailType } from '@/store/questions/types'
export const getQuizDetailInfo = (state: RootState) => {
    return state.quizzes.quizDetail
}
export const getQuestionsFromQuiz = (state: RootState) => {
    const newList: QuestionDetailType[] = []
    if (state.quizzes.quizDetail.questions.length !== 0) {
        state.quizzes.quizDetail.questions.forEach((item) => {
            newList.push(item)
        })
    }
    return newList
}
export const getCourseIdQuiz = (state: RootState) => {
    return state.quizzes.quizDetail.courseId
}
export const getQuestionsForQuiz = (state: RootState) => {
    const newList: QuestionDetailType[] = []
    if (state.quizzes.questionsList.length !== 0) {
        state.quizzes.questionsList.forEach((item) => {
            newList.push(item)
        })
    }
    return newList
}

export const getQuestionsIdFromQuiz = (state: RootState) => {
    const newList: string[] = []
    state.quizzes.quizDetail.questions?.forEach((item) => {
        newList.push(item._id)
    })
    return newList
}

export const getQuizSelect = (state: RootState) => {
    const newList: QuizSelectType[] = []
    if (state.quizzes.quizzes.length !== 0) {
        state.quizzes.quizzes.forEach((item) => {
            newList.push({
                label: item.name,
                value: item._id,
            })
        })
    }
    return newList
}

export const getQuizzez = (state: RootState) => {
    const newList: QuizDetailType[] = []
    if (state.quizzes.quizzes.length !== 0) {
        state.quizzes.quizzes.forEach((item) => {
            newList.push(item)
        })
    }
    return newList
}
