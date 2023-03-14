import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { QuestionDetailType } from './types'
import { QuestionCreateType } from '@/api/dto/course.dto'
import { v4 as uuidv4 } from 'uuid'

const initialState = [
    {
        _id: '',
        question: 'TEST REDUX 1 ?',
        choices: ['SUCCESS', 'SUCCESS', 'SUCCESS'],
        correctAnswer: 0,
        courseId: '',
        medias: [''],
    },
    {
        _id: '',
        question: 'TEST REDUX 2 ?',
        choices: ['SUCCESS', 'SUCCESS', 'SUCCESS'],
        correctAnswer: 0,
        courseId: '',
        medias: [''],
    },
]

export const questionsListDetailSlice = createSlice({
    name: 'questionsListDetailSlice',
    initialState,
    reducers: {
        AddAllQuestionState(
            state,
            action: PayloadAction<QuestionCreateType[]>,
        ) {
            const newList: QuestionDetailType[] = state
            action.payload.forEach((item) => {
                newList.push({
                    _id: uuidv4(),
                    question: item.question,
                    choices: item.choices,
                    correctAnswer: item.correctAnswer,
                    courseId: item.courseId,
                    medias: item.medias,
                })
            })
            return [...newList]
        },
        UpdateAllQuestionState(
            state,
            action: PayloadAction<QuestionDetailType[]>,
        ) {
            const newList: QuestionDetailType[] = []
            action.payload.forEach((item) => {
                newList.push({
                    _id: item._id,
                    question: item.question,
                    choices: item.choices,
                    correctAnswer: item.correctAnswer,
                    courseId: item.courseId,
                    medias: item.medias,
                })
            })
            return [...newList]
        },
    },
})

export const { UpdateAllQuestionState, AddAllQuestionState } =
    questionsListDetailSlice.actions

export default questionsListDetailSlice.reducer
