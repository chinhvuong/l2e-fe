import { RootState } from '..'
import { QuestionDetailType } from './types'
export const getQuestionsInfo = (state: RootState) => {
    const newList: QuestionDetailType[] = []
    if (state.questions.length !== 0) {
        state.questions.forEach((item) => {
            newList.push(item)
        })
    }
    return newList
}
