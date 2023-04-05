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
import CreateQuestionModal from './create-question/create-question-form'
import { useCreateQuestionBankContext } from './create-quiz-context'
import QuestionCard from './flashcard'
import QuestionModal from '@/components/core/modal/question-modal'
import { QuestionDetailType } from '@/store/questions/types'

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
    const [positionQuiz, setPositionQuiz] = useState<number>(0)
    const [showModal, setShowModal] = useState(false)
    const [showViewQuestionModal, setShowViewQuestionModal] = useState(false)
    const [selectedQuestion, setSelectedQuestion] =
        useState<QuestionDetailType>({} as QuestionDetailType)
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
    const chosenQuiz = (indext: number) => {
        localStorage.setItem(QUIZ_ID, quizzezDetail?.[indext]?._id)
        setPositionQuiz(indext)
        dispatch(UpdateQuizDetailState(quizzezDetail?.[indext]))
    }
    const openUpdateQuizPage = (indext: number) => {
        chosenQuiz(indext)
        setShowQuizModal(true)
    }
    const openCreateQuestionsModal = () => {
        dispatch(ClearQuestionState())
        setShowModal(true)
    }
    const openCreateQuizModal = () => {
        dispatch(ClearQuizDetailState())
        setShowQuizModal(true)
    }

    useEffect(() => {
        if (Object.keys(selectedQuestion).length !== 0) {
            setShowViewQuestionModal(true)
        }
    }, [selectedQuestion])

    return (
        <div>
            <LoadingScreen isLoading={isLoading} />
            <QuestionModal
                isShow={showViewQuestionModal}
                setIsShow={setShowViewQuestionModal}
                question={selectedQuestion}
            />
            <div
                className="ml-auto mr-auto max-w-7xl grid-cols-3 app-transition main-transition min-h-screen bg-white"
                id="content"
            >
                <div className="flex flex-row justify-between">
                    <h1 className="flex basis-full text-3xl font-semibold">
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
                <div className="block mr-80 min-w-0 leading-relaxed">
                    <div className="flex basis-full text-3xl font-semibold">
                        Question
                    </div>
                    <div className="space-y-2">
                        {questionListsDetail?.map((item, index) => (
                            <div
                                key={index}
                                className="flex justify-between items-center rounded shadow-md hover:bg-gray-300 px-5 py-3 cursor-pointer"
                                onClick={() => chosenQuestions(index)}
                            >
                                <div className="text-black font-semibold text-lg line-clamp-2">
                                    {item.question}
                                </div>
                                <div className="flex items-center space-x-5">
                                    <FontAwesomeIcon
                                        onClick={() =>
                                            setSelectedQuestion(item)
                                        }
                                        className="cursor-pointer h-6 items-center text-black mt-0.5"
                                        icon={faEye}
                                    />
                                    <FontAwesomeIcon
                                        onClick={() =>
                                            openUpdateQuestionsPage(index)
                                        }
                                        className="cursor-pointer h-6 items-center text-black"
                                        icon={faEdit}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
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
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {!showModal && (
                    <Button
                        className="flex items-center gap-4 p-1 text-sm w-1/5 h-1/3"
                        onClick={() => openCreateQuestionsModal()}
                    >
                        <span>Create Questions</span>
                    </Button>
                )}
                <CreateQuestionModal
                    showModal={showModal}
                    OpenModal={setShowModal}
                />
                {!showModal && (
                    <Button
                        className="flex items-center gap-4 p-1 text-sm w-1/5 h-1/3"
                        onClick={() => openCreateQuizModal()}
                    >
                        <span>Create Quiz</span>
                    </Button>
                )}
                <CreateQuizModal
                    showModal={showQuizModal}
                    OpenModal={setShowQuizModal}
                />
            </div>
        </div>
    )
}
