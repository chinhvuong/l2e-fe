import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { QuizDetailType } from './types'
import { v4 as uuidv4 } from 'uuid'
import { QuestionDetailType } from '@/store/questions/types'
const initialState = {
    quizDetail: {
        _id: '',
        questions: [
            {
                _id: '',
                question: '',
                choices: [''],
                correctAnswer: 0,
                courseId: '',
                medias: [''],
            },
        ],
        courseId: '',
        name: '',
        createdAt: '',
        updatedAt: '',
    },
    questionsList: [
        {
            _id: '',
            question: '',
            choices: [''],
            correctAnswer: 0,
            courseId: '',
            medias: [''],
        },
    ],
}
export const quizDetailSlice = createSlice({
    name: 'quizDetailSlice',
    initialState,
    reducers: {
        UpdateQuizState(state, action: PayloadAction<QuizDetailType>) {
            const newQuiz: QuizDetailType = action.payload
            state.quizDetail = newQuiz
        },
        UpdateCourseIdState(state, action: PayloadAction<string>) {
            state.quizDetail.courseId = action.payload
        },
        UpdateQuestionsFromQuizState(
            state,
            action: PayloadAction<QuestionDetailType[]>,
        ) {
            const newList: QuestionDetailType[] = []
            action.payload.forEach((item) => {
                newList.push(item)
            })
            state.quizDetail.questions = [...newList]
        },
        UpdateQuestionsListForQuizState(
            state,
            action: PayloadAction<QuestionDetailType[]>,
        ) {
            const newList: QuestionDetailType[] = []
            action.payload.forEach((item) => {
                newList.push(item)
            })
            state.questionsList = newList
        },
        ClearQuizState(state) {
            const newquizDetail: QuizDetailType = {
                _id: '',
                questions: [
                    {
                        _id: '',
                        question: '',
                        choices: [''],
                        correctAnswer: 0,
                        courseId: '',
                        medias: [''],
                    },
                ],
                courseId: '',
                name: '',
                createdAt: '',
                updatedAt: '',
            } as QuizDetailType
            state.quizDetail = newquizDetail
        },
    },
})

export const {
    UpdateQuizState,
    UpdateCourseIdState,
    UpdateQuestionsFromQuizState,
    ClearQuizState,
    UpdateQuestionsListForQuizState,
} = quizDetailSlice.actions

export default quizDetailSlice.reducer
