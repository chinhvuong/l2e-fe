import LoadingScreen from '@/components/core/animate/loading-screen'
import Button from '@/components/core/button'
import { QUESTION_ID, QUIZ_ID } from '@/constants/localStorage'
import { useAppDispatch } from '@/hooks'
import {
    ClearQuestionState,
    UpdateDetailQuestionState,
} from '@/store/course/question'
import { ClearQuizDetailState, UpdateQuizDetailState } from '@/store/quiz'
import { QuizDetailType } from '@/store/quiz/types'
import { faEye, faEdit } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import CreateQuizModal from '../quiz/create-quiz'
import { QuestionDetailType } from '@/store/questions/types'
import { useCreateCourseContext } from '@/containers/create-course/create-course-context'
import useHideFirstEnterLoadingScreen from '@/hooks/useHideFirstEnterLoadingScreen'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export default function QuizCointainer() {
    const { quizzezDetail, deleteQuiz } = useCreateCourseContext()
    const [isLoading, setIsLoading] = useState(true)
    const dispatch = useAppDispatch()
    const [positionQuiz, setPositionQuiz] = useState<number>(0)
    const [showQuizModal, setShowQuizModal] = useState(false)
    const chosenQuiz = (indext: number) => {
        localStorage.setItem(QUIZ_ID, quizzezDetail?.[indext]?._id)
        setPositionQuiz(indext)
        dispatch(UpdateQuizDetailState(quizzezDetail?.[indext]))
    }
    const deleteQuizAction = (indext: number) => {
        localStorage.setItem(QUIZ_ID, quizzezDetail?.[indext]?._id)
        deleteQuiz({})
    }
    const openUpdateQuizPage = (indext: number) => {
        chosenQuiz(indext)
        setShowQuizModal(true)
    }
    const openCreateQuizModal = () => {
        dispatch(ClearQuizDetailState())
        setShowQuizModal(true)
    }
    useEffect(() => {
        if (quizzezDetail?.[0]?._id !== '') {
            setIsLoading(false)
        }
    }, [quizzezDetail])
    useHideFirstEnterLoadingScreen()
    return (
        <div>
            <LoadingScreen isLoading={isLoading} />
            <div
                className="ml-auto mr-auto max-w-7xl grid-cols-3 app-transition main-transition min-h-screen bg-white"
                id="content"
            >
                <div className="flex flex-row justify-between">
                    <h1 className="flex basis-full text-3xl font-semibold">
                        Question Bank
                    </h1>
                </div>
                <div className="block mr-80 min-w-0 leading-relaxed w-full">
                    <div className="flex basis-full text-3xl font-semibold">
                        Quizzes
                    </div>
                    {quizzezDetail?.map((item, index) => (
                        <div
                            key={index}
                            className="p-0.25 rounded inline-block shadow-3xl min-h-r w-full hover:bg-gray-400"
                        >
                            <div className="p-4 w-full block">
                                <div
                                    className="inline-block float-left w-4/5 mt-2 align-top"
                                    onClick={() => chosenQuiz(index)}
                                >
                                    <div className="py-0 px-2 flex">
                                        <div className="text-black w-2/5">
                                            <span className="text-black">
                                                {item.name}
                                            </span>
                                        </div>
                                        <div className="text-black w-2/5 px-4"></div>
                                        <div className="text-black w-1/5">
                                            <FontAwesomeIcon
                                                onClick={() =>
                                                    openUpdateQuizPage(index)
                                                }
                                                className="hover:bg-gray-700 h-8 items-center pb-3"
                                                icon={faEdit}
                                            />
                                            <FontAwesomeIcon
                                                onClick={() =>
                                                    deleteQuizAction(index)
                                                }
                                                className="cursor-pointer h-6 items-center text-black"
                                                icon={faTrash}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {!showQuizModal && (
                    <Button
                        className="flex items-center gap-4 p-1 text-sm w-1/5 h-1/3"
                        onClick={() => openCreateQuizModal()}
                    >
                        <span>Create Quiz</span>
                    </Button>
                )}
                {showQuizModal && (
                    <CreateQuizModal
                        showModal={showQuizModal}
                        OpenModal={setShowQuizModal}
                    />
                )}
            </div>
        </div>
    )
}
