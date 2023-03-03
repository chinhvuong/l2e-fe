import { RootState } from '@/store'

export const getCourseDetailInfo = (state: RootState) => {
    return state.questionDetail
}
