import { InstructorAPI } from '@/api/api-path'
import useAPI from '@/api/hooks/useAPI'
import Button from '@/components/core/button'
import DeleteConfirmModal from '@/components/core/modal/delete-confirm-modal'
import QuizModal from '@/components/core/modal/quiz-modal'
import '@/components/core/modal/style.scss'
import Pagination from '@/components/core/pagination'
import { QUIZ_ID } from '@/constants/localStorage'
import Title from '@/containers/create-course/components/title'
import { useCreateCourseContext } from '@/containers/create-course/create-course-context'
import { useAppDispatch } from '@/hooks'
import { ClearQuizDetailState, UpdateQuizDetailState } from '@/store/quiz'
import { QuizDetailType } from '@/store/quiz/types'
import { updateGlobalLoadingState } from '@/store/user'
import { faEdit, faEye, faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { noop } from 'lodash'
import { useEffect, useState } from 'react'
import Search from '../../../components/common/search'
import CreateQuizModal from '../quiz/create-quiz'

export enum QuizTitle {
    LIST = 'Quizzes',
    ADD = 'Create a Quiz',
    EDIT = 'Edit a Quiz',
}

export default function QuizContainer() {
    const {
        quizzezDetail,
        getQuizzesList,
        setSearchQuizzes,
        setPageNumberQuizzes,
        totalPageQuizzes,
    } = useCreateCourseContext()
    const [isLoading, setIsLoading] = useState(true)
    const dispatch = useAppDispatch()
    const [showViewQuizModal, setShowViewQuizModal] = useState(false)
    const [selectedQuiz, setSelectedQuiz] = useState<QuizDetailType>()
    const [showDeleteQuizConfirmModal, setShowDeleteQuizConfirmModal] =
        useState(false)
    const [quizId, setQuizId] = useState('')
    const [isDelete, setIsDelete] = useState(false)
    const [mode, setMode] = useState<QuizTitle>(QuizTitle.LIST)
    const [selectedItemIndex, setSelectedItemIndex] = useState(0)

    const { mutate: deleteQuiz, isLoading: isLoadingDeleteQuiz } =
        useAPI.delete(InstructorAPI.DELETE_QUIZ + quizId, {
            onError: noop,
            onSuccess: () => {
                getQuizzesList({})
                setQuizId('')
                setIsDelete(false)
                localStorage.removeItem(QUIZ_ID)
            },
        })
    const chosenQuiz = (index: number) => {
        localStorage.setItem(QUIZ_ID, quizzezDetail?.[index]?._id)
        dispatch(UpdateQuizDetailState(quizzezDetail?.[index]))
    }
    const deleteQuizAction = (index: number) => {
        localStorage.setItem(QUIZ_ID, quizzezDetail?.[index]?._id)
        setIsDelete(true)
    }

    const handleOpenViewQuizModal = (item: QuizDetailType) => {
        setSelectedQuiz(item)
        setShowViewQuizModal(true)
    }

    const handleOpenDeleteConfirmModal = (index: number) => {
        setShowDeleteQuizConfirmModal(true)
        setSelectedItemIndex(index)
    }

    const goToAddQuizMode = () => {
        dispatch(ClearQuizDetailState())
        setMode(QuizTitle.ADD)
    }

    const goToEditQuizMode = (index: number) => {
        chosenQuiz(index)
        setMode(QuizTitle.EDIT)
    }

    const handleDeleteQuiz = () => {
        setShowDeleteQuizConfirmModal(false)
        deleteQuizAction(selectedItemIndex)
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

    useEffect(() => {
        dispatch(updateGlobalLoadingState(isLoading || isLoadingDeleteQuiz))
    }, [isLoading, isLoadingDeleteQuiz])

    useEffect(() => {
        setSearchQuizzes('')
        setPageNumberQuizzes(1)
    }, [mode])

    return (
        <div>
            {showViewQuizModal && selectedQuiz && (
                <QuizModal
                    isShow={showViewQuizModal}
                    setIsShow={setShowViewQuizModal}
                    quiz={selectedQuiz}
                />
            )}
            <DeleteConfirmModal
                isShow={showDeleteQuizConfirmModal}
                setIsShow={setShowDeleteQuizConfirmModal}
                deleteAction={handleDeleteQuiz}
            />
            <Title title={mode}>
                {mode === QuizTitle.LIST && (
                    <Button
                        className="btn-primary"
                        onClick={() => goToAddQuizMode()}
                    >
                        <div className="font-medium text-sm">
                            {QuizTitle.ADD}
                        </div>
                    </Button>
                )}
            </Title>
            {mode === QuizTitle.LIST ? (
                <>
                    <Search
                        darkTheme={false}
                        setSearch={setSearchQuizzes}
                        className="mx-10 my-5"
                        placeholder="Search for any quizzes"
                    />
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
                                        onClick={() =>
                                            handleOpenViewQuizModal(item)
                                        }
                                        className="cursor-pointer h-6 items-center text-black mt-0.5"
                                        icon={faEye}
                                    />
                                    <FontAwesomeIcon
                                        onClick={() => goToEditQuizMode(index)}
                                        className="cursor-pointer h-6 items-center text-black"
                                        icon={faEdit}
                                    />
                                    <FontAwesomeIcon
                                        onClick={() =>
                                            handleOpenDeleteConfirmModal(index)
                                        }
                                        className="cursor-pointer h-6 items-center text-black"
                                        icon={faTrashCan}
                                    />
                                </div>
                            </div>
                        ))}
                        {quizzezDetail.length === 0 && (
                            <div className="flex justify-center text-xl font-bold my-10">
                                No results found.
                            </div>
                        )}
                    </div>
                    <Pagination
                        totalPage={totalPageQuizzes}
                        setPageNumber={setPageNumberQuizzes}
                    />
                </>
            ) : (
                <CreateQuizModal changeMode={setMode} />
            )}
        </div>
    )
}
