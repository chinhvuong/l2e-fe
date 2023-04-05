import Button from '@/components/core/button'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { QuestionDetailType } from '@/store/questions/types'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { getQuestionsInfo } from '@/store/questions/selectors'
import QuestionCard from './flashcard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import useAPI from '@/api/hooks/useAPI'
import { InstructorAPI } from '@/api/api-path'
import { COURSE_ID, QUESTION_ID, QUIZ_ID } from '@/constants/localStorage'
import { UpdateAllQuestionState } from '@/store/questions'
import LoadingScreen from '@/components/core/animate/loading-screen'
import {
    UpdateDetailQuestionState,
    ClearQuestionState,
} from '@/store/course/question'
import { getQuestionDetailInfo } from '@/store/course/question/selectors'
import {
    ClearQuizDetailState,
    UpdateCourseIdState,
    UpdateQuizDetailState,
    UpdateQuizzesState,
} from '@/store/quiz'
import { QuizDetailType } from '@/store/quiz/types'
import { getQuizzez } from '@/store/quiz/selectors'
import { useCreateQuestionBankContext } from './create-quiz-context'
import CreateQuestionModal from './create-question/create-question-form'
import CreateQuizModal from '../quiz/create-quiz'

export default function QuestionBankContainers() {
    const {
        isLoading,
        questionListsDetail,
        quizzezDetail,
        questionDetail,
        quizDetail,
    } = useCreateQuestionBankContext()
    const router = useRouter()
    const [courseId, setCourseId] = useState<string>('')
    const dispatch = useAppDispatch()
    const [quizlists, setQuizlists] = useState<QuizDetailType[]>([])
    const [positionQuestion, setPositionQuestion] = useState<number>(0)
    const goToCreateQuestionsPage = () => {
        dispatch(ClearQuizDetailState())
        dispatch(ClearQuestionState())
        router.push({
            pathname: router.pathname + '/create',
            query: { ...router.query },
        })
    }
    const [showModal, setShowModal] = useState(false)
    const [showQuizModal, setShowQuizModal] = useState(false)
    const openUpdateQuestionsPage = (indext: number) => {
        chosenQuestions(indext)
        setShowModal(true)
    }
    const chosenQuestions = (indext: number) => {
        localStorage.setItem(QUESTION_ID, questionListsDetail?.[indext]?._id)
        setPositionQuestion(indext)
        dispatch(UpdateDetailQuestionState(questionListsDetail?.[indext]))
    }
    const openCreateQuestionsModal = () => {
        dispatch(ClearQuestionState())
        setShowModal(true)
    }
    const openCreateQuizModal = () => {
        dispatch(ClearQuizDetailState())
        setShowQuizModal(true)
    }
    return (
        <div>
            <LoadingScreen isLoading={isLoading} />
            <div
                className="ml-auto mr-auto max-w-7xl grid-cols-3 app-transition main-transition min-h-screen bg-white"
                id="content"
            >
                <div className="flex flex-row justify-between">
                    <h1 className="flex basis-full text-3xl font-semibold">
                        {' '}
                        Question Bank
                    </h1>
                </div>
                {questionListsDetail?.[positionQuestion] !== undefined && (
                    <div className="flex flex-col justify-between leading-relaxed text-black">
                        <div className="block">
                            <QuestionCard
                                question={
                                    questionListsDetail?.[positionQuestion]
                                }
                            />
                        </div>
                        <div className="flex h-full w-full m-auto"></div>
                    </div>
                )}
                <div className="block mr-80 min-w-0">
                    <div className="block leading-relaxed">
                        <section className="block m-0">
                            <div className="p-0">
                                <section className="block ">
                                    <div className="block">
                                        <div className="flex basis-full text-3xl font-semibold">
                                            {' '}
                                            Question
                                        </div>
                                        {questionListsDetail?.map(
                                            (item, index) => (
                                                <div
                                                    key={index}
                                                    className="p-0.25 rounded inline-block shadow-3xl min-h-r w-full hover:bg-gray-400"
                                                >
                                                    <div className="p-4 w-full block">
                                                        <div
                                                            className="inline-block float-left w-4/5 mt-2 align-top"
                                                            onClick={() =>
                                                                chosenQuestions(
                                                                    index,
                                                                )
                                                            }
                                                        >
                                                            <div className="py-0 px-2 flex">
                                                                <div className="text-black w-2/5">
                                                                    <span className="text-black">
                                                                        {
                                                                            item.question
                                                                        }
                                                                    </span>
                                                                </div>
                                                                <div className="text-black w-2/5 px-4">
                                                                    <span className="text-black">
                                                                        {
                                                                            item
                                                                                .choices[
                                                                                item
                                                                                    .correctAnswer
                                                                            ]
                                                                        }
                                                                    </span>
                                                                </div>
                                                                <div className="text-black w-1/5">
                                                                    <FontAwesomeIcon
                                                                        onClick={() =>
                                                                            openUpdateQuestionsPage(
                                                                                index,
                                                                            )
                                                                        }
                                                                        className="hover:bg-gray-700 h-8 items-center pb-3"
                                                                        icon={
                                                                            faEdit
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ),
                                        )}
                                        <div className="flex basis-full text-3xl font-semibold">
                                            Quizzes
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </section>
                    </div>
                </div>
                <div className="flex my-5 w-full">
                    <div className="w-1/3"></div>
                    {!showModal && (
                        <Button
                            className="flex items-center gap-4 p-1 text-sm w-1/5 h-1/3"
                            onClick={() => openCreateQuestionsModal()}
                        >
                            <span>Create Questions</span>
                        </Button>
                    )}
                </div>
                <CreateQuestionModal
                    showModal={showModal}
                    OpenModal={setShowModal}
                />
                <div className="flex my-5 w-full">
                    <div className="w-1/3"></div>
                    {!showModal && (
                        <Button
                            className="flex items-center gap-4 p-1 text-sm w-1/5 h-1/3"
                            onClick={() => openCreateQuizModal()}
                        >
                            <span>Create Quiz</span>
                        </Button>
                    )}
                </div>
                <CreateQuizModal
                    showModal={showQuizModal}
                    OpenModal={setShowQuizModal}
                />
            </div>
        </div>
    )
}
