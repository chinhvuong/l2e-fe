import { PlayQuizRes } from '@/store/questions/types'
import React, { useEffect, useState } from 'react'
import Button from '../button'
import useAPI from '@/api/hooks/useAPI'
import { LearnerAPI } from '@/api/api-path'
import { noop } from 'lodash'

interface IPlayQuizModalProps {
    isShow: boolean
    setIsShow: React.Dispatch<React.SetStateAction<boolean>>
    quiz: PlayQuizRes
}

export default function PlayQuizModal(props: IPlayQuizModalProps) {
    const { isShow, setIsShow, quiz } = props
    const answerPrefix = ['A. ', 'B. ', 'C. ', 'D. ']

    const [showModal, setShowModal] = useState(isShow)
    const [answers, setAnswers] = useState<number[]>([])

    useEffect(() => {
        setShowModal(isShow)
    }, [isShow])

    useEffect(() => {
        Object.keys(quiz).length !== 0 &&
            setAnswers(Array(quiz.questions.length).fill(-1))
    }, [quiz])

    const handleShowModal = (value: boolean) => {
        setShowModal(value)
        setIsShow(value)
    }

    const { mutate: submitQuizAnswer, isLoading: isLoadingSubmitQuizAnswer } =
        useAPI.put(LearnerAPI.SUBMIT_QUIZ_ANSWER, {
            onError: noop,
            onSuccess(response) {
                console.log('submitQuizAnswer', response)
            },
        })

    const handleSubmitQuiz = () => {
        submitQuizAnswer({
            gameId: quiz.gameId,
            answers: quiz.questions.map((question, index) => {
                return {
                    questionId: question._id,
                    answer: answers[index],
                }
            }),
        })
    }

    const handleCheckAnswer = (index: number, value: number) => {
        const newAnswers = [...answers]
        newAnswers[index] = value
        setAnswers(newAnswers)
    }

    return (
        <>
            {showModal ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="p-10">
                                    <div className="text-xl font-bold px-6 pb-5">
                                        Completed this quiz before moving to the
                                        next lesson!
                                    </div>
                                    <div className="space-y-5">
                                        {quiz.questions.map(
                                            (question, questionIndex) => {
                                                return (
                                                    <div key={questionIndex}>
                                                        <div className="pl-6">
                                                            <h1 className="font-semibold text-lg mb-3">
                                                                {
                                                                    question?.question
                                                                }
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
                                                                        // className={`flex justify-between items-center rounded-[80px] py-3 px-6 border-2 font-medium ${
                                                                        //     index ===
                                                                        //     question?.correctAnswer
                                                                        //         ? `bg-green-400 bg-opacity-10 text-green-400 border-green-400`
                                                                        //         : `text-description border-description`
                                                                        // }`}
                                                                        className={`flex justify-between items-center rounded-[80px] cursor-pointer hover:bg-primary-hover hover:border-primary-hover py-3 px-6 border-2 font-medium ${
                                                                            answers[
                                                                                questionIndex
                                                                            ] ===
                                                                            choiceIndex
                                                                                ? 'bg-primary border-primary'
                                                                                : 'bg-white'
                                                                        }`}
                                                                        onClick={() =>
                                                                            handleCheckAnswer(
                                                                                questionIndex,
                                                                                choiceIndex,
                                                                            )
                                                                        }
                                                                    >
                                                                        <span>
                                                                            {answerPrefix[
                                                                                choiceIndex
                                                                            ] +
                                                                                choice}
                                                                        </span>
                                                                        {/* {index ===
																		question?.correctAnswer && (
																		<FontAwesomeIcon
																			icon={
																				faCircleCheck
																			}
																			className="text-[20px] text-green-400 ml-2"
																		/>
																	)} */}
                                                                    </div>
                                                                ),
                                                            )}
                                                        </div>
                                                    </div>
                                                )
                                            },
                                        )}
                                    </div>
                                    <Button
                                        className="btn-primary mt-10 w-full"
                                        onClick={() => handleSubmitQuiz()}
                                    >
                                        <div className="font-medium w-full text-center">
                                            Submit
                                        </div>
                                    </Button>
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
                    <div className="bg-gray-700 bg-opacity-50 fixed inset-0 z-40"></div>
                </>
            ) : null}
        </>
    )
}
