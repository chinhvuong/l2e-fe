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
    quizzes: [
        {
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
    ],
}
export const quizzesSlice = createSlice({
    name: 'quizzesSlice',
    initialState,
    reducers: {
        UpdateQuizzesState(state, action: PayloadAction<QuizDetailType[]>) {
            const newList: QuizDetailType[] = []
            action.payload.forEach((item) => {
                newList.push(item)
            })
            state.quizzes = newList
        },
        UpdateQuizDetailState(state, action: PayloadAction<QuizDetailType>) {
            const newQuiz: QuizDetailType = action.payload
            state.quizDetail = newQuiz
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
        ClearQuizDetailState(state) {
            const newquizDetail: QuizDetailType = {} as QuizDetailType
            state.quizDetail = newquizDetail
        },
    },
})

export const {
    UpdateQuizzesState,
    UpdateQuizDetailState,
    UpdateQuestionsFromQuizState,
    ClearQuizDetailState,
    UpdateQuestionsListForQuizState,
} = quizzesSlice.actions

export default quizzesSlice.reducer
