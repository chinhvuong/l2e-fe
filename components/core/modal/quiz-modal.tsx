import { QuestionDetailType } from '@/store/questions/types'
import { QuizDetailType } from '@/store/quiz/types'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef, useState } from 'react'
import './style.scss'

interface IQuizModalProps {
    isShow: boolean
    setIsShow: React.Dispatch<React.SetStateAction<boolean>>
    quiz: QuizDetailType
}

export default function QuizModal(props: IQuizModalProps) {
    const { isShow, setIsShow, quiz } = props
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
                    <div className="flex justify-center items-center fixed inset-0 z-40 outline-none focus:outline-none">
                        <div className="relative">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="px-10 my-12 max-h-[550px] overflow-y-auto scrollbar">
                                    <div className="text-xl font-bold px-6 pb-5">
                                        Quiz: {quiz.name}
                                    </div>
                                    <div className="space-y-5 max-w-3xl ">
                                        {quiz &&
                                            quiz.questions.map(
                                                (
                                                    question: QuestionDetailType,
                                                    questionIndex,
                                                ) => {
                                                    return (
                                                        <div
                                                            key={questionIndex}
                                                        >
                                                            <div className="px-6">
                                                                <h1 className="font-semibold text-lg mb-3">
                                                                    {`${
                                                                        questionIndex +
                                                                        1
                                                                    }. ` +
                                                                        question?.question}
                                                                </h1>
                                                            </div>
                                                            <div className="grid grid-cols-2 gap-5 w-full">
                                                                {question?.choices.map(
                                                                    (
                                                                        choice,
                                                                        choiceIndex,
                                                                    ) => (
                                                                        <div
                                                                            key={
                                                                                choiceIndex
                                                                            }
                                                                            className={`flex justify-between items-center rounded-[80px] cursor-pointer py-3 px-6 border-2 font-medium ${
                                                                                choiceIndex ===
                                                                                question?.correctAnswer
                                                                                    ? `bg-green-400 bg-opacity-10 text-green-400 border-green-400`
                                                                                    : `text-description border-description`
                                                                            }`}
                                                                        >
                                                                            <span>
                                                                                {answerPrefix[
                                                                                    choiceIndex
                                                                                ] +
                                                                                    choice}
                                                                            </span>
                                                                            {choiceIndex ===
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
                                                    )
                                                },
                                            )}
                                    </div>
                                </div>
                                <div
                                    className="absolute top-5 right-5 cursor-pointer bg-gray-300 px-2 rounded-full"
                                    onClick={() => handleShowModal(false)}
                                >
                                    x
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-700 bg-opacity-50 fixed inset-0 z-30"></div>
                </>
            ) : null}
        </>
    )
}
