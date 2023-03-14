import { useAppDispatch } from '@/hooks'
import { QuestionDetailType } from '@/store/questions/types'
import { UpdateQuestionsFromQuizState } from '@/store/quiz'
import { useFormikContext } from 'formik'
import { ChangeEvent, useState } from 'react'

export interface IQuestionsInputType {
    questions: string[]
}

export interface IQuestionsListModalProps {
    questionsList: QuestionDetailType[]
}

export default function QuestionsListModal(props: IQuestionsListModalProps) {
    const { questionsList } = props
    const [chosenQuestions, setQuestions] = useState<QuestionDetailType[]>([])
    const context = useFormikContext<IQuestionsInputType>()
    const [showModal, setShowModal] = useState(false)
    const dispatch = useAppDispatch()
    function handleChange(event: ChangeEvent<HTMLInputElement>): void {
        const { checked, name, value } = event.target
        if (checked) {
            context.setFieldValue('questions', [
                ...context.values.questions,
                name,
            ])
            setQuestions([...chosenQuestions, questionsList?.[parseInt(value)]])
            dispatch(
                UpdateQuestionsFromQuizState([
                    ...chosenQuestions,
                    questionsList?.[parseInt(value)],
                ]),
            )
        } else {
            context.setFieldValue(
                'questions',
                context.values.questions.filter((v) => v !== name),
            )
            setQuestions(
                chosenQuestions.filter(
                    (question) => question !== questionsList?.[parseInt(value)],
                ),
            )
            dispatch(
                UpdateQuestionsFromQuizState(
                    chosenQuestions.filter(
                        (question) =>
                            question !== questionsList?.[parseInt(value)],
                    ),
                ),
            )
        }
    }
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
                                    <h3 className="text-3xl font=semibold">
                                        Questions List
                                    </h3>
                                    <button
                                        className="bg-transparent border-0 text-black float-right"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span className="text-black opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full">
                                            x
                                        </span>
                                    </button>
                                </div>
                                <div className="relative p-6 flex-auto">
                                    {questionsList.map((question, indext) => (
                                        <div key={question._id}>
                                            <input
                                                id={question._id}
                                                type="checkbox"
                                                name={question._id}
                                                value={indext}
                                                checked={context.values.questions.includes(
                                                    question._id,
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
