import { QuestionDetailType } from '@/store/questions/types'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'

interface IQuestionModalProps {
    isShow: boolean
    setIsShow: React.Dispatch<React.SetStateAction<boolean>>
    question: QuestionDetailType
}

export default function QuestionModal(props: IQuestionModalProps) {
    const { isShow, setIsShow, question } = props
    const answerPrefix = ['A. ', 'B. ', 'C. ', 'D. ']

    const [showModal, setShowModal] = useState(isShow)

    useEffect(() => {
        setShowModal(isShow)
    }, [isShow])

    const handleShowModal = (value: boolean) => {
        setShowModal(value)
        setIsShow(value)
    }

    return (
        <>
            {showModal ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="flex items-center justify-between p-5">
                                    <div className="item-center p-5">
                                        <div className="p-4">
                                            <h1 className="font-bold text-xl mb-2">
                                                {question?.question}
                                            </h1>
                                        </div>
                                        <div className="grid grid-cols-2 gap-5 w-full">
                                            {question?.choices.map(
                                                (choice, index) => (
                                                    <div
                                                        key={index}
                                                        className={`flex justify-between items-center rounded-[80px] cursor-pointer py-3 px-6 border-2 font-medium ${
                                                            index ===
                                                            question?.correctAnswer
                                                                ? `bg-green-400 bg-opacity-10 text-green-400 border-green-400`
                                                                : `text-description border-description`
                                                        }`}
                                                    >
                                                        <span>
                                                            {answerPrefix[
                                                                index
                                                            ] + choice}
                                                        </span>
                                                        {index ===
                                                            question?.correctAnswer && (
                                                            <FontAwesomeIcon
                                                                icon={
                                                                    faCircleCheck
                                                                }
                                                                className="text-[20px] text-green-400 ml-2"
                                                            />
                                                        )}
                                                    </div>
                                                ),
                                            )}
                                        </div>
                                    </div>
                                    <div
                                        className="absolute top-5 right-5 cursor-pointer"
                                        onClick={() => handleShowModal(false)}
                                    >
                                        ✕
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-700 bg-opacity-50 fixed inset-0 z-40"></div>
                </>
            ) : null}
        </>
    )
}
