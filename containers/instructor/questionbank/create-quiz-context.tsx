import { InstructorAPI } from '@/api/api-path'
import useAPI from '@/api/hooks/useAPI'
import { COURSE_ID, QUESTION_ID, QUIZ_ID } from '@/constants/localStorage'
import { QuestionDetailType } from '@/store/questions/types'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { QuizDetailType } from '@/store/quiz/types'
import {
    UpdateCourseIdState,
    UpdateQuizDetailState,
    UpdateQuizzesState,
} from '@/store/quiz'
import { UseMutateFunction } from '@tanstack/react-query'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { getQuestionsInfo } from '@/store/questions/selectors'
import { getQuizDetailInfo, getQuizzez } from '@/store/quiz/selectors'
import { UpdateAllQuestionState } from '@/store/questions'
import { getQuestionDetailInfo } from '@/store/course/question/selectors'
import { UpdateDetailQuestionState } from '@/store/course/question'
interface ICreateQuestionBankContext {
    isLoading: boolean
    getQuiz: UseMutateFunction<unknown, any, object, unknown>
    getQuestion: UseMutateFunction<unknown, any, object, unknown>
    getQuestionsList: UseMutateFunction<unknown, any, object, unknown>
    getQuizzesList: UseMutateFunction<unknown, any, object, unknown>
    questionListsDetail: QuestionDetailType[]
    quizzezDetail: QuizDetailType[]
    quizDetail: QuizDetailType
    questionDetail: QuestionDetailType
}

export const CreateQuestionBankContext =
    createContext<ICreateQuestionBankContext>({} as ICreateQuestionBankContext)

export const CreateCourseProvider: React.FC<React.PropsWithChildren<{}>> = ({
    children,
}) => {
    const dispatch = useAppDispatch()
    const questionListsDetail = useAppSelector(getQuestionsInfo)
    const quizzezDetail = useAppSelector(getQuizzez)
    const quizDetail = useAppSelector(getQuizDetailInfo)
    const questionDetail = useAppSelector(getQuestionDetailInfo)
    const [courseId, setCourseId] = useState('')
    const [quizId, setQuizId] = useState('')
    const [questionId, setQuestionId] = useState('')

    const { mutate: getQuestion, isLoading: isLoadingQuestion } =
        useAPI.getMutation(
            InstructorAPI.GET_QUESTIONS +
                '?query=' +
                questionId +
                '&courseId=' +
                courseId,
            {
                onError: () => {},
                onSuccess: (response) => {
                    dispatch(UpdateDetailQuestionState(response?.data))
                },
            },
        )
    const { mutate: getQuiz, isLoading: isLoadingQuiz } = useAPI.getMutation(
        InstructorAPI.GET_QUIZZES +
            '?query=' +
            quizId +
            '&courseId=' +
            courseId,
        {
            onError: () => {},
            onSuccess: (response) => {
                dispatch(UpdateQuizDetailState(response?.data))
            },
        },
    )

    const { mutate: getQuestionsList, isLoading: isLoadingQuestionsList } =
        useAPI.getMutation(
            InstructorAPI.GET_QUESTIONS + '?courseId=' + courseId,
            {
                onError: () => {},
                onSuccess: (response) => {
                    dispatch(UpdateAllQuestionState(response?.data))
                    dispatch(UpdateCourseIdState(courseId))
                },
            },
        )
    const { mutate: getQuizzesList, isLoading: isLoadingQuizzesList } =
        useAPI.getMutation(
            InstructorAPI.GET_QUIZZES + '?courseId=' + courseId,
            {
                onError: () => {},
                onSuccess: (response) => {
                    console.log(response)
                    dispatch(UpdateQuizzesState(response?.data))
                },
            },
        )
    useEffect(() => {
        if (courseId !== localStorage.getItem(COURSE_ID)) {
            setCourseId(localStorage.getItem(COURSE_ID) ?? '')
            if (quizId !== localStorage.getItem(QUIZ_ID)) {
                setQuizId(localStorage.getItem(QUIZ_ID) ?? '')
            }
            if (questionId !== localStorage.get(QUESTION_ID)) {
                setQuestionId(localStorage.getItem(QUESTION_ID) ?? '')
            }
        } else {
            if (localStorage.getItem(COURSE_ID) !== null) {
                getQuestionsList({})
                getQuizzesList({})
                if (localStorage.getItem(QUIZ_ID) !== null) {
                    getQuiz({})
                }
                if (localStorage.getItem(QUESTION_ID) !== null) {
                    getQuestion({})
                }
            }
        }
    }, [courseId])

    const isLoading = useMemo(() => {
        return (
            isLoadingQuestionsList ||
            isLoadingQuizzesList ||
            isLoadingQuestion ||
            isLoadingQuiz
        )
    }, [
        isLoadingQuestionsList,
        isLoadingQuizzesList,
        isLoadingQuestion,
        isLoadingQuiz,
    ])

    return (
        <CreateQuestionBankContext.Provider
            value={{
                isLoading,
                getQuestionsList,
                getQuizzesList,
                getQuestion,
                getQuiz,
                questionListsDetail,
                quizzezDetail,
                quizDetail,
                questionDetail,
            }}
        >
            {children}
        </CreateQuestionBankContext.Provider>
    )
}

export const useCreateQuestionBankContext = () => {
    return useContext(CreateQuestionBankContext) as ICreateQuestionBankContext
}
