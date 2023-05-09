import { LearnerAPI } from '@/api/api-path'
import useAPI from '@/api/hooks/useAPI'
import {
    LectureQuiz,
    useLearningCourseContext,
} from '@/containers/learn-course/learning-course-context'
import { PlayQuizRes } from '@/store/questions/types'
import {
    faCircleCheck,
    faCircleExclamation,
    faCircleXmark,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { noop } from 'lodash'
import { useEffect, useRef, useState } from 'react'
import LoadingScreen from '../animate/loading-screen'
import Button from '../button'
import './style.scss'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import Router from 'next/router'

interface IPlayFinalTestModalProps {
    isShow: boolean
    setIsShow: (state: boolean) => void
    quiz: LectureQuiz
}

export default function PlayFinalTestModal(props: IPlayFinalTestModalProps) {
    const { isShow, setIsShow, quiz } = props
    const { isPerfectScore } = useLearningCourseContext()
    const answerPrefix = ['A. ', 'B. ', 'C. ', 'D. ']

    const [showModal, setShowModal] = useState(isShow)
    const [answers, setAnswers] = useState<number[]>([])
    const [timer, setTimer] = useState<string>('10:00')
    const [isStart, setIsStart] = useState<boolean>(false)
    const [isFinish, setIsFinish] = useState<boolean>(false)
    const [timerId, setTimerId] = useState<NodeJS.Timeout>()
    const [finalTest, setFinalTest] = useState<PlayQuizRes | undefined>(
        undefined,
    )
    const [totalQuestions, setTotalQuestions] = useState(0)
    const [percentage, setPercentage] = useState(0)
    const [text, setText] = useState('')

    const countdownTimer = (expiredAt: string) => {
        const countdownDate = new Date(
            new Date(expiredAt).getTime() + 1 * 1000,
        ).getTime()
        const countdown = setInterval(() => {
            // Get today's date and time
            const now = new Date().getTime()

            // Find the distance between now and the count down date
            const distance = countdownDate - now

            // Time calculations for days, hours, minutes and seconds
            const minutes = Math.floor(
                (distance % (1000 * 60 * 60)) / (1000 * 60),
            )
            const seconds = Math.floor((distance % (1000 * 60)) / 1000)

            // Output the result in an element with id="demo"
            const min = minutes < 10 ? `0${minutes}` : minutes
            const sec = seconds < 10 ? `0${seconds}` : seconds
            setTimer(min + ':' + sec)

            // If the count down is over, write some text
            if (distance < 0) {
                clearInterval(countdown)
                setTimer("Time's up!")
                finalTest &&
                    submitFinalTestAnswer({
                        gameId: finalTest.gameId,
                        answers: finalTest.questions.map((question, index) => {
                            return {
                                questionId: question._id,
                                answer: answers[index],
                            }
                        }),
                    })
            }
        }, 1000)
        return countdown
    }

    const modalContent = useRef<HTMLDivElement>(null)

    const {
        mutate: getFinalTestDetail,
        isLoading: isLoadingGetFinalTestDetail,
    } = useAPI.post(LearnerAPI.GET_FINAL_TEST_DETAIL, {
        onError: noop,
        onSuccess(response) {
            setFinalTest(response)
            setTotalQuestions(response.questions.length)
            setIsStart(true)
            setTimerId(countdownTimer(response.expiredAt))
        },
    })

    useEffect(() => {
        return () => {
            clearInterval(timerId)
        }
    }, [])

    useEffect(() => {
        setShowModal(isShow)
    }, [isShow])

    const handleShowModal = (value: boolean) => {
        setShowModal(value)
        setIsShow(value)
    }

    const {
        mutate: submitFinalTestAnswer,
        isLoading: isLoadingSubmitFinalTestAnswer,
    } = useAPI.put(LearnerAPI.SUBMIT_FINAL_TEST_ANSWER, {
        onError: noop,
        onSuccess(response) {
            setIsFinish(true)
            setPercentage(response.win_rate * 100)
            setText(`${response.win_rate * totalQuestions}/${totalQuestions}`)
        },
    })

    const handleSubmitFinalTest = () => {
        finalTest &&
            submitFinalTestAnswer({
                gameId: finalTest.gameId,
                answers: finalTest.questions.map((question, index) => {
                    return {
                        questionId: question._id,
                        answer: answers[index],
                    }
                }),
            })
    }

    const handleStartPlayingFinalTest = () => {
        getFinalTestDetail({
            id: quiz.courseId,
        })
    }

    const handleCheckAnswer = (
        index: number,
        value: number,
        checkable: boolean,
    ) => {
        if (checkable) {
            const newAnswers = [...answers]
            newAnswers[index] = value
            setAnswers(newAnswers)
        }
    }

    const isOverflowY = () => {
        if (modalContent && modalContent.current) {
            return (
                modalContent.current.scrollHeight !==
                Math.max(
                    modalContent.current.offsetHeight,
                    modalContent.current.clientHeight,
                )
            )
        }
    }

    return (
        <>
            {showModal ? (
                <>
                    <LoadingScreen
                        isLoading={
                            isLoadingSubmitFinalTestAnswer ||
                            isLoadingGetFinalTestDetail
                        }
                    />
                    <div
                        className={`${
                            isPerfectScore ? 'hidden' : 'flex'
                        } justify-center items-center fixed inset-0 z-40 outline-none focus:outline-none`}
                    >
                        <div className="relative">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div
                                    className={`${
                                        isOverflowY()
                                            ? 'py-10 pl-10 pr-5'
                                            : 'p-10'
                                    }`}
                                >
                                    <div className="text-xl font-bold px-6 pb-5">
                                        Final Test
                                    </div>
                                    {!isStart ? (
                                        <div className="px-6 w-[470px]">
                                            <div className="text-lg font-medium pb-5">
                                                {`You've completed all the lessons in this course! Take the final test to claim your certificate!`}
                                            </div>
                                            <div>
                                                <ul className="list-disc grid gap-y-2">
                                                    <div className="flex">
                                                        <FontAwesomeIcon
                                                            icon={
                                                                faCircleExclamation
                                                            }
                                                            className="text-[20px] text-red-500 mr-2"
                                                        />
                                                        <span>Warning:</span>
                                                    </div>
                                                    <li>
                                                        You can only take this
                                                        test once.
                                                    </li>
                                                    <li>
                                                        The system will not show
                                                        the answers of this test
                                                        after you submit it.
                                                    </li>
                                                    <li>
                                                        Please check the
                                                        internet connection
                                                        carefully. If it is
                                                        interrupted, you will
                                                        fail the test and you
                                                        will not claim the
                                                        certificate of this
                                                        course.
                                                    </li>
                                                    <li>
                                                        You will only pass the
                                                        final test and claim the
                                                        certificate if you
                                                        answer correctly over
                                                        60% of total questions.
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="flex justify-center">
                                                <Button
                                                    className="btn-primary mt-5"
                                                    onClick={() =>
                                                        handleStartPlayingFinalTest()
                                                    }
                                                >
                                                    <div className="font-medium text-center px-10">
                                                        Start
                                                    </div>
                                                </Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            {!isFinish ? (
                                                <div className="flex justify-center w-full font-bold text-2xl pb-5">
                                                    {timer}
                                                </div>
                                            ) : (
                                                <div className="px-10 pb-3">
                                                    <CircularProgressbar
                                                        value={percentage}
                                                        text={text}
                                                        className="h-[80px]"
                                                        styles={buildStyles({
                                                            pathColor:
                                                                percentage > 60
                                                                    ? '#07DA63'
                                                                    : '#F48C06',
                                                            trailColor:
                                                                '#4d4c4c',
                                                            textColor:
                                                                '#000000',
                                                        })}
                                                    />
                                                    <div className="mt-5 font-medium">
                                                        {percentage > 60
                                                            ? `Congratulation! You
                                                        passed the final test!
                                                        Claim your certificate
                                                        now.`
                                                            : `Sorry, you failed the final test...`}
                                                    </div>
                                                    {percentage > 60 && (
                                                        <div className="flex justify-center">
                                                            <Button
                                                                className=" btn-primary mt-6"
                                                                onClick={() =>
                                                                    Router.push(
                                                                        '/profile/certificates',
                                                                    )
                                                                }
                                                            >
                                                                <div className="font-medium text-center">
                                                                    Claim
                                                                    certificate
                                                                </div>
                                                            </Button>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                            {!isFinish && (
                                                <>
                                                    <div
                                                        className={`space-y-5 max-w-3xl max-h-80 ${
                                                            isOverflowY() &&
                                                            'overflow-y-scroll scrollbar pr-5'
                                                        }`}
                                                        ref={modalContent}
                                                    >
                                                        {finalTest &&
                                                            finalTest.questions.map(
                                                                (
                                                                    question,
                                                                    questionIndex,
                                                                ) => {
                                                                    return (
                                                                        <div
                                                                            key={
                                                                                questionIndex
                                                                            }
                                                                        >
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
                                                                                            className={`flex justify-between items-center rounded-[80px] cursor-pointer ${
                                                                                                !question?.correctAnswer &&
                                                                                                'hover:bg-primary-hover hover:border-primary-hover hover:text-white'
                                                                                            } py-3 px-6 border-2 font-medium ${
                                                                                                answers[
                                                                                                    questionIndex
                                                                                                ] ===
                                                                                                choiceIndex
                                                                                                    ? 'bg-primary border-primary text-white'
                                                                                                    : 'bg-white'
                                                                                            } ${
                                                                                                choiceIndex ===
                                                                                                question?.correctAnswer
                                                                                                    ? `bg-green-400 bg-opacity-10 text-green-400 border-green-400`
                                                                                                    : answers[
                                                                                                          questionIndex
                                                                                                      ] ===
                                                                                                          choiceIndex &&
                                                                                                      question?.correctAnswer &&
                                                                                                      `bg-red-400 bg-opacity-10 text-red-400 border-red-400`
                                                                                            }`}
                                                                                            onClick={() =>
                                                                                                handleCheckAnswer(
                                                                                                    questionIndex,
                                                                                                    choiceIndex,
                                                                                                    !question?.correctAnswer,
                                                                                                )
                                                                                            }
                                                                                        >
                                                                                            <span>
                                                                                                {answerPrefix[
                                                                                                    choiceIndex
                                                                                                ] +
                                                                                                    choice}
                                                                                            </span>
                                                                                            {choiceIndex ===
                                                                                            question?.correctAnswer ? (
                                                                                                <FontAwesomeIcon
                                                                                                    icon={
                                                                                                        faCircleCheck
                                                                                                    }
                                                                                                    className="text-[20px] text-green-400 ml-2"
                                                                                                />
                                                                                            ) : (
                                                                                                answers[
                                                                                                    questionIndex
                                                                                                ] ===
                                                                                                    choiceIndex &&
                                                                                                question?.correctAnswer && (
                                                                                                    <FontAwesomeIcon
                                                                                                        icon={
                                                                                                            faCircleXmark
                                                                                                        }
                                                                                                        className="text-[20px] text-red-400 ml-2"
                                                                                                    />
                                                                                                )
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
                                                    <Button
                                                        className="btn-primary mt-10 w-full"
                                                        onClick={() =>
                                                            handleSubmitFinalTest()
                                                        }
                                                    >
                                                        <div className="font-medium w-full text-center">
                                                            Submit
                                                        </div>
                                                    </Button>
                                                </>
                                            )}
                                        </>
                                    )}
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
                    <div
                        className={`${
                            isPerfectScore && 'hidden'
                        } bg-gray-700 bg-opacity-50 fixed inset-0 z-30`}
                    ></div>
                </>
            ) : null}
        </>
    )
}
