import { InstructorAPI } from '@/api/api-path'
import useAPI from '@/api/hooks/useAPI'
import LoadingScreen from '@/components/core/animate/loading-screen'
import Button from '@/components/core/button'
import { QUIZ_ID } from '@/constants/localStorage'
import Title from '@/containers/create-course/components/title'
import { useCreateCourseContext } from '@/containers/create-course/create-course-context'
import { useAppDispatch } from '@/hooks'
import useHideFirstEnterLoadingScreen from '@/hooks/useHideFirstEnterLoadingScreen'
import { ClearQuizDetailState, UpdateQuizDetailState } from '@/store/quiz'
import { faEdit, faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import CreateQuizModal from '../quiz/create-quiz'

export default function QuizCointainer() {
    const { quizzezDetail, getQuizzesList } = useCreateCourseContext()
    const [isLoading, setIsLoading] = useState(true)
    const dispatch = useAppDispatch()
    const [positionQuiz, setPositionQuiz] = useState<number>(0)
    const [showQuizModal, setShowQuizModal] = useState(false)
    const [quizId, setQuizId] = useState('')
    const [isDelete, setIsDelete] = useState(false)
    const { mutate: deleteQuiz, isLoading: isLoadingDeleteQuiz } =
        useAPI.delete(InstructorAPI.DELETE_QUIZ + quizId, {
            onError: () => {},
            onSuccess: (response) => {
                getQuizzesList({})
                setQuizId('')
                setIsDelete(false)
                localStorage.removeItem(QUIZ_ID)
            },
        })
    const chosenQuiz = (indext: number) => {
        localStorage.setItem(QUIZ_ID, quizzezDetail?.[indext]?._id)
        setPositionQuiz(indext)
        dispatch(UpdateQuizDetailState(quizzezDetail?.[indext]))
    }
    const deleteQuizAction = (indext: number) => {
        localStorage.setItem(QUIZ_ID, quizzezDetail?.[indext]?._id)
        setIsDelete(true)
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
        if (quizId !== localStorage.getItem(QUIZ_ID)) {
            setQuizId(localStorage.getItem(QUIZ_ID) ?? '')
        } else {
            if (isDelete) {
                deleteQuiz({})
            }
        }
    }, [quizzezDetail, quizId, isDelete])
    useHideFirstEnterLoadingScreen()
    return (
        <div>
            <LoadingScreen isLoading={isLoading || isLoadingDeleteQuiz} />
            {showQuizModal && (
                <CreateQuizModal
                    showModal={showQuizModal}
                    OpenModal={setShowQuizModal}
                />
            )}
            <Title title={'Quizzes'}>
                {!showQuizModal && (
                    <Button
                        className="btn-primary"
                        onClick={() => openCreateQuizModal()}
                    >
                        <div className="font-medium text-sm">Create Quiz</div>
                    </Button>
                )}
            </Title>
            <div className="grid grid-cols-1 divide-y divide-gray-300">
                {quizzezDetail?.map((item, index) => (
                    <div
                        key={index}
                        className="flex justify-between items-center hover:bg-gray-300 px-10 py-3 cursor-pointer"
                        onClick={() => chosenQuiz(index)}
                    >
                        <div className="text-black line-clamp-2">
                            {item.name}
                        </div>
                        <div className="flex items-center space-x-5">
                            <FontAwesomeIcon
                                onClick={() => openUpdateQuizPage(index)}
                                className="cursor-pointer h-6 items-center text-black"
                                icon={faEdit}
                            />
                            <FontAwesomeIcon
                                onClick={() => deleteQuizAction(index)}
                                className="cursor-pointer h-6 items-center text-black"
                                icon={faTrashCan}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
