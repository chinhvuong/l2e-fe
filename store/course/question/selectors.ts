import { RootState } from '@/store'

export const getQuestionDetailInfo = (state: RootState) => {
    return state.questionDetail
}
