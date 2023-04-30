import { useAppSelector } from '@/hooks'
import { QuestionDetailType } from '@/store/questions/types'
import { getQuizDetailInfo } from '@/store/quiz/selectors'
import { useFormikContext } from 'formik'
import {
    ChangeEvent,
    Dispatch,
    SetStateAction,
    useEffect,
    useRef,
    useState,
} from 'react'
import './style.scss'
import Button from '../button'

export interface IQuestionsInputType {
    questions: QuestionDetailType[]
}

export interface IQuestionsListModalProps {
    questionsList: QuestionDetailType[]
    isEdit: boolean
    setShowModal: Dispatch<SetStateAction<boolean>>
}

export default function QuestionsListModal(props: IQuestionsListModalProps) {
    const { questionsList, isEdit, setShowModal } = props
    const context = useFormikContext<IQuestionsInputType>()
    const quizDetail = useAppSelector(getQuizDetailInfo)
    const [chosenQuestions, setQuestions] = useState<QuestionDetailType[]>([])
    const modalContent = useRef<HTMLDivElement>(null)
    const [isOverflowContent, setIsOverflowContent] = useState(false)

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { checked, name, value } = event.target
        if (checked) {
            setQuestions([...chosenQuestions, questionsList?.[parseInt(value)]])
            context.setFieldValue('questions', [
                ...context.values.questions,
                questionsList?.[parseInt(value)],
            ])
        } else {
            context.setFieldValue(
                'questions',
                context.values.questions.filter((v) => v._id !== name),
            )
            setQuestions(
                chosenQuestions.filter(
                    (question) =>
                        question._id !== questionsList?.[parseInt(value)]._id,
                ),
            )
        }
    }

    const checkQuestion = (question: QuestionDetailType) => {
        if (
            context.values.questions.filter(
                (object) => object._id === question._id,
            ).length > 0
        ) {
            return true
        } else {
            return false
        }
    }

    const isOverflowY = () => {
        if (modalContent && modalContent.current) {
            setIsOverflowContent(
                modalContent.current.scrollHeight !==
                    Math.max(
                        modalContent.current.offsetHeight,
                        modalContent.current.clientHeight,
                    ),
            )
        }
    }

    useEffect(() => {
        if (isEdit) {
            setQuestions(quizDetail.questions)
        }
    }, [isEdit, quizDetail])

    useEffect(() => {
        isOverflowY()
    }, [])

    return (
        <>
            <div className="flex justify-center items-center fixed inset-0 z-40 outline-none focus:outline-none">
                <div className="relative">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div className="p-10">
                            <div className="flex items-start justify-between pb-5 border-b border-solid border-gray-300 rounded-t">
                                <div className="text-xl font-bold">
                                    Questions List
                                </div>
                                <button
                                    className="bg-transparent border-0 text-black float-right"
                                    onClick={() => setShowModal(false)}
                                >
                                    <span className="text-black opacity-7 h-6 w-6 text-xl block py-0 ">
                                        x
                                    </span>
                                </button>
                            </div>
                            <div
                                className={`space-y-5 max-w-3xl h-80 my-5 ${
                                    isOverflowContent &&
                                    'overflow-y-scroll scrollbar pr-5'
                                }`}
                                ref={modalContent}
                            >
                                {questionsList.map((question, index) => (
                                    <div key={question._id} className="flex">
                                        <div className="w-4 h-4 mt-0.5 mr-3 cursor-pointer">
                                            <input
                                                className="w-4 h-4"
                                                id={String(index)}
                                                type="checkbox"
                                                name={question._id}
                                                value={index}
                                                checked={checkQuestion(
                                                    question,
                                                )}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div>{question.question}</div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-end space-x-5">
                                <Button
                                    outline
                                    onClick={() => setShowModal(false)}
                                >
                                    <div className="font-medium">Cancel</div>
                                </Button>
                                <button
                                    type="submit"
                                    className="rounded-[80px] py-3 px-8 border text-white bg-primary enabled:hover:bg-primary-hover"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gray-700 bg-opacity-50 fixed inset-0 z-30"></div>
        </>
    )
}
