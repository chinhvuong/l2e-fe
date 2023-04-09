import { useAppDispatch, useAppSelector } from '@/hooks'
import { QuestionDetailType } from '@/store/questions/types'
import { UpdateQuestionsFromQuizState } from '@/store/quiz'
import { getQuizDetailInfo } from '@/store/quiz/selectors'
import { useFormikContext } from 'formik'
import { ChangeEvent, useEffect, useState } from 'react'

export interface IQuestionsInputType {
    questions: QuestionDetailType[]
}

export interface IQuestionsListModalProps {
    questionsList: QuestionDetailType[]
    updateQuiz?: boolean
    updateCourse?: boolean
    isEdit?: boolean
}

export default function QuestionsListModal(props: IQuestionsListModalProps) {
    const { questionsList, isEdit } = props
    const context = useFormikContext<IQuestionsInputType>()
    const quizDetail = useAppSelector(getQuizDetailInfo)
    const [chosenQuestions, setQuestions] = useState<QuestionDetailType[]>([])
    const [showModal, setShowModal] = useState(false)
    const dispatch = useAppDispatch()
    console.log(context.values.questions)
    function handleChange(event: ChangeEvent<HTMLInputElement>): void {
        const { checked, name, value } = event.target
        console.log(checked)
        console.log(chosenQuestions)
        if (checked) {
            setQuestions([...chosenQuestions, questionsList?.[parseInt(value)]])
            context.setFieldValue('questions', [
                ...context.values.questions,
                questionsList?.[parseInt(value)],
            ])
            // dispatch(
            //     UpdateQuestionsFromQuizState([
            //         ...chosenQuestions,
            //         questionsList?.[parseInt(value)],
            //     ]),
            // )
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
            // dispatch(
            //     UpdateQuestionsFromQuizState(
            //         chosenQuestions.filter(
            //             (question) =>
            //                 question._id !==
            //                 questionsList?.[parseInt(value)]._id,
            //         ),
            //     ),
            // )
        }
    }
    console.log(context.values.questions)
    useEffect(() => {
        if (isEdit) {
            setQuestions(quizDetail.questions)
        }
    }, [isEdit, quizDetail])
    return (
        <>
            <button
                className="bg-blue-200 text-black active:bg-blue-500 
      font-bold px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                type="button"
                onClick={() => setShowModal(true)}
            >
                Show Questions Lists
            </button>
            {showModal ? (
                <>
                    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                                    <h3 className="text-2xl font-bold">
                                        Questions List
                                    </h3>
                                    <button
                                        className="bg-transparent border-0 text-black float-right"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span className="text-black opacity-7 h-6 w-6 text-xl block  py-0 ">
                                            x
                                        </span>
                                    </button>
                                </div>
                                <div className="relative p-6 flex-auto">
                                    {questionsList.map((question, indext) => (
                                        <div key={question._id}>
                                            <input
                                                className="m-1 p-2"
                                                id={String(indext)}
                                                type="checkbox"
                                                name={question._id}
                                                value={indext}
                                                checked={context.values?.questions?.includes(
                                                    question,
                                                )}
                                                onChange={handleChange}
                                            />
                                            <label htmlFor={question._id}>
                                                {question.question}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
        </>
    )
}
