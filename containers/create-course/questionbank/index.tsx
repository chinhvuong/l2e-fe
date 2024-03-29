import { InstructorAPI } from '@/api/api-path'
import useAPI from '@/api/hooks/useAPI'
import Button from '@/components/core/button'
import DeleteConfirmModal from '@/components/core/modal/delete-confirm-modal'
import QuestionModal from '@/components/core/modal/question-modal'
import Pagination from '@/components/core/pagination'
import { QUESTION_ID } from '@/constants/localStorage'
import Title from '@/containers/create-course/components/title'
import { useCreateCourseContext } from '@/containers/create-course/create-course-context'
import { useAppDispatch } from '@/hooks'
import {
    ClearQuestionState,
    UpdateDetailQuestionState,
} from '@/store/course/question'
import { QuestionDetailType } from '@/store/questions/types'
import { updateGlobalLoadingState } from '@/store/user'
import { faEdit, faEye, faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { noop } from 'lodash'
import { useEffect, useState } from 'react'
import Search from '../../../components/common/search'
import CreateQuestionModal from './create-question/create-question-form'

export enum QuestionBankTitle {
    LIST = 'Questions',
    ADD = 'Create Question(s)',
    EDIT = 'Edit Question',
}

export default function QuestionBankContainers() {
    const {
        questionListsDetail,
        getQuestionsList,
        setSearchQuestions,
        setPageNumberQuestions,
        totalPageQuestions,
    } = useCreateCourseContext()
    const [isLoading, setIsLoading] = useState(true)
    const dispatch = useAppDispatch()
    const [showViewQuestionModal, setShowViewQuestionModal] = useState(false)
    const [showDeleteQuestionConfirmModal, setShowDeleteQuestionConfirmModal] =
        useState(false)
    const [selectedQuestion, setSelectedQuestion] =
        useState<QuestionDetailType>({} as QuestionDetailType)
    const [questionId, setQuestionId] = useState('')
    const [isDelete, setDelete] = useState(false)
    const [selectedItemIndex, setSelectedItemIndex] = useState(0)
    const [mode, setMode] = useState<QuestionBankTitle>(QuestionBankTitle.LIST)

    const { mutate: deleteQuestion, isLoading: isLoadingDeleteQuestion } =
        useAPI.delete(InstructorAPI.DELETE_QUESTION + questionId, {
            onError: noop,
            onSuccess: () => {
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
        dispatch(UpdateDetailQuestionState(questionListsDetail?.[index]))
    }

    const goToAddQuestionsMode = () => {
        dispatch(ClearQuestionState())
        setMode(QuestionBankTitle.ADD)
    }

    const goToEditQuestionMode = (index: number) => {
        chosenQuestions(index)
        setMode(QuestionBankTitle.EDIT)
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

    useEffect(() => {
        dispatch(updateGlobalLoadingState(isLoading || isLoadingDeleteQuestion))
    }, [isLoading, isLoadingDeleteQuestion])

    useEffect(() => {
        setSearchQuestions('')
        setPageNumberQuestions(1)
    }, [mode])

    return (
        <div>
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
            <Title title={mode}>
                {mode === QuestionBankTitle.LIST && (
                    <Button
                        className="btn-primary"
                        onClick={() => goToAddQuestionsMode()}
                    >
                        <div className="font-medium text-sm">
                            {QuestionBankTitle.ADD}
                        </div>
                    </Button>
                )}
            </Title>
            {mode === QuestionBankTitle.LIST ? (
                <>
                    <Search
                        darkTheme={false}
                        setSearch={setSearchQuestions}
                        className="mx-10 my-5"
                        placeholder="Search for any questions"
                    />
                    <div className="grid grid-cols-1">
                        {questionListsDetail?.map((item, index) => (
                            <div
                                key={index}
                                className="flex justify-between items-center hover:bg-gray-300 px-10 py-3 cursor-pointer border-t border-gray-300"
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
                                        onClick={() =>
                                            goToEditQuestionMode(index)
                                        }
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
                        {questionListsDetail.length === 0 && (
                            <div className="flex justify-center text-xl font-bold my-10">
                                No results found.
                            </div>
                        )}
                    </div>
                    <Pagination
                        totalPage={totalPageQuestions}
                        setPageNumber={setPageNumberQuestions}
                    />
                </>
            ) : (
                <CreateQuestionModal changeMode={setMode} />
            )}
        </div>
    )
}
