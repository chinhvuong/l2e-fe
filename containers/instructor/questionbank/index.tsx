import { InstructorAPI } from '@/api/api-path'
import useAPI from '@/api/hooks/useAPI'
import LoadingScreen from '@/components/core/animate/loading-screen'
import Button from '@/components/core/button'
import QuestionModal from '@/components/core/modal/question-modal'
import { QUESTION_ID } from '@/constants/localStorage'
import { useCreateCourseContext } from '@/containers/create-course/create-course-context'
import { useAppDispatch } from '@/hooks'
import useHideFirstEnterLoadingScreen from '@/hooks/useHideFirstEnterLoadingScreen'
import {
    ClearQuestionState,
    UpdateDetailQuestionState,
} from '@/store/course/question'
import { QuestionDetailType } from '@/store/questions/types'
import { faEdit, faEye, faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import CreateQuestionModal from './create-question/create-question-modal'
import Title from '@/containers/create-course/components/title'
import DeleteConfirmModal from '@/components/core/modal/delete-confirm-modal'

export default function QuestionBankContainers() {
    const { questionListsDetail, getQuestionsList } = useCreateCourseContext()
    const [isLoading, setIsLoading] = useState(true)
    const dispatch = useAppDispatch()
    const [positionQuestion, setPositionQuestion] = useState<number>(0)
    const [showCreateQuestionModal, setShowCreateQuestionModal] =
        useState(false)
    const [showViewQuestionModal, setShowViewQuestionModal] = useState(false)
    const [showDeleteQuestionConfirmModal, setShowDeleteQuestionConfirmModal] =
        useState(false)
    const [selectedQuestion, setSelectedQuestion] =
        useState<QuestionDetailType>({} as QuestionDetailType)
    const [questionId, setQuestionId] = useState('')
    const [isDelete, setDelete] = useState(false)
    const [selectedItemIndex, setSelectedItemIndex] = useState(0)

    const openUpdateQuestionsPage = (index: number) => {
        chosenQuestions(index)
        setShowCreateQuestionModal(true)
    }
    const { mutate: deleteQuestion, isLoading: isLoadingDeleteQuestion } =
        useAPI.delete(InstructorAPI.DELETE_QUESTION + questionId, {
            onError: () => {},
            onSuccess: (response) => {
                getQuestionsList({})
                setDelete(false)
                setQuestionId('')
                localStorage.removeItem(QUESTION_ID)
            },
        })
    const deleteQuestionAction = (index: number) => {
        localStorage.setItem(QUESTION_ID, questionListsDetail?.[index]?._id)
        setDelete(true)
    }
    const chosenQuestions = (index: number) => {
        localStorage.setItem(QUESTION_ID, questionListsDetail?.[index]?._id)
        setPositionQuestion(index)
        dispatch(UpdateDetailQuestionState(questionListsDetail?.[index]))
    }

    const openCreateQuestionsModal = () => {
        dispatch(ClearQuestionState())
        setShowCreateQuestionModal(true)
    }

    const handleDeleteQuestion = () => {
        setShowDeleteQuestionConfirmModal(false)
        deleteQuestionAction(selectedItemIndex)
    }

    const handleOpenDeleteConfirmModal = (index: number) => {
        setShowDeleteQuestionConfirmModal(true)
        setSelectedItemIndex(index)
    }

    const handleOpenViewQuestionModal = (item: QuestionDetailType) => {
        setSelectedQuestion(item)
        setShowViewQuestionModal(true)
    }

    useEffect(() => {
        if (questionListsDetail?.[0]?._id !== '') {
            setIsLoading(false)
        }
        if (questionId !== localStorage.getItem(QUESTION_ID)) {
            setQuestionId(localStorage.getItem(QUESTION_ID) ?? '')
        } else {
            if (isDelete) {
                deleteQuestion({})
            }
        }
    }, [questionListsDetail, questionId, isDelete])

    useHideFirstEnterLoadingScreen()

    return (
        <div>
            <LoadingScreen isLoading={isLoading || isLoadingDeleteQuestion} />
            <Title title={'Questions'}>
                {!showCreateQuestionModal && (
                    <Button
                        className="btn-primary"
                        onClick={() => openCreateQuestionsModal()}
                    >
                        <div className="font-medium text-sm">
                            Create Questions
                        </div>
                    </Button>
                )}
            </Title>
            <QuestionModal
                isShow={showViewQuestionModal}
                setIsShow={setShowViewQuestionModal}
                question={selectedQuestion}
            />
            <DeleteConfirmModal
                isShow={showDeleteQuestionConfirmModal}
                setIsShow={setShowDeleteQuestionConfirmModal}
                deleteAction={handleDeleteQuestion}
            />
            {showCreateQuestionModal && (
                <CreateQuestionModal
                    showModal={showCreateQuestionModal}
                    openModal={setShowCreateQuestionModal}
                />
            )}
            <div className="grid grid-cols-1 divide-y divide-gray-300">
                {questionListsDetail?.map((item, index) => (
                    <div
                        key={index}
                        className="flex justify-between items-center hover:bg-gray-300 px-10 py-3 cursor-pointer"
                        onClick={() => chosenQuestions(index)}
                    >
                        <div className="text-black line-clamp-2 pr-5">
                            {item.question}
                        </div>
                        <div className="flex items-center space-x-5">
                            <FontAwesomeIcon
                                onClick={() =>
                                    handleOpenViewQuestionModal(item)
                                }
                                className="cursor-pointer h-6 items-center text-black mt-0.5"
                                icon={faEye}
                            />
                            <FontAwesomeIcon
                                onClick={() => openUpdateQuestionsPage(index)}
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
            </div>
        </div>
    )
}
