import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { QuestionDetailType } from '@/store/questions/types'
import { QuestionCreateType } from '@/api/dto/course.dto'
import { v4 as uuidv4 } from 'uuid'

const initialState = {
    _id: '',
    question: '',
    choices: [''],
    correctAnswer: 0,
    courseId: '',
    medias: [''],
}

export const questionDetailSlice = createSlice({
    name: 'questionDetailSlice',
    initialState,
    reducers: {
        UpdateDetailQuestionState(
            state,
            action: PayloadAction<QuestionDetailType>,
        ) {
            const questionDetail: QuestionDetailType = action.payload
            return questionDetail
        },
        ClearQuestionState(state) {
            const questionDetail: QuestionDetailType = {
                _id: '',
                question: '',
                choices: ['', '', '', ''],
                correctAnswer: 0,
                courseId: '',
                medias: [''],
            } as QuestionDetailType
            return questionDetail
        },
    },
})

export const { UpdateDetailQuestionState, ClearQuestionState } =
    questionDetailSlice.actions

export default questionDetailSlice.reducer
