import { useFormikContext } from 'formik'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { QuestionDetailType } from '@/store/questions/types'
export interface IQuestionsInputType {
    questions: string[]
}

export interface IQuestionsListModalProps {
    name: string
    questionsList: QuestionDetailType[]
}

export default function QuestionsListModal(props: IQuestionsListModalProps) {
    const { name, questionsList } = props
    const context = useFormikContext<IQuestionsInputType>()
    const [showModal, setShowModal] = useState(false)
    function handleChange(event: ChangeEvent<HTMLInputElement>): void {
        const { checked, name } = event.target
        if (checked) {
            context.setFieldValue('questions', [
                ...context.values.questions,
                name,
            ])
        } else {
            context.setFieldValue(
                'questions',
                context.values.questions.filter((v) => v !== name),
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
                Show questions list
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
                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
        </>
    )
}
