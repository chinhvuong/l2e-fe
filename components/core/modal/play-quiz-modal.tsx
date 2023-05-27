import { LearnerAPI } from '@/api/api-path'
import useAPI from '@/api/hooks/useAPI'
import {
    LectureQuiz,
    useLearningCourseContext,
} from '@/containers/learn-course/learning-course-context'
import { useAppDispatch } from '@/hooks'
import { PlayQuizRes, QuestionInPlayQuiz } from '@/store/questions/types'
import { updateGlobalLoadingState } from '@/store/user'
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { noop } from 'lodash'
import { useEffect, useState } from 'react'
import Button from '../button'
import './style.scss'

interface IPlayQuizModalProps {
    isShow: boolean
    setIsShow: (state: boolean) => void
    quiz: LectureQuiz
    isCurrentLessonLearned: boolean
}

export default function PlayQuizModal(props: IPlayQuizModalProps) {
    const { isShow, setIsShow, quiz, isCurrentLessonLearned } = props
    const { handlePerfectScore, isPerfectScore, getLearningCourseDetail } =
        useLearningCourseContext()
    const answerPrefix = ['A. ', 'B. ', 'C. ', 'D. ']

    const [showModal, setShowModal] = useState(isShow)
    const [answers, setAnswers] = useState<number[]>([])
    const [timer, setTimer] = useState<string>('10:00')
    const [isStart, setIsStart] = useState<boolean>(false)
    const [isFinish, setIsFinish] = useState<boolean>(false)
    const [timerId, setTimerId] = useState<NodeJS.Timeout>()
    const [currentQuiz, setCurrentQuiz] = useState<PlayQuizRes>()
    const [numberOfCorrectAnswer, setNumberOfCorrectAnswer] = useState(0)
    const [totalQuestions, setTotalQuestions] = useState(0)
    const dispatch = useAppDispatch()

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
                clearInterval(timerId)
                setTimerId(undefined)
            }
        }, 1000)
        return countdown
    }

    const { mutate: getQuizDetail, isLoading: isLoadingGetQuizDetail } =
        useAPI.post(LearnerAPI.GET_QUIZ_DETAIL, {
            onError: noop,
            onSuccess(response) {
                setCurrentQuiz(response)
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

    const countNumberOfCorrectAnswer = (
        quizAnswer: QuestionInPlayQuiz[],
    ): boolean => {
        let count = 0
        answers.forEach((answer, index) => {
            if (answer === quizAnswer[index].correctAnswer) {
                count++
            }
        })
        setNumberOfCorrectAnswer(count)
        if (count === totalQuestions) {
            handlePerfectScore(true)
            return true
        }
        return false
    }

    const { mutate: submitQuizAnswer, isLoading: isLoadingSubmitQuizAnswer } =
        useAPI.put(LearnerAPI.SUBMIT_QUIZ_ANSWER, {
            onError: noop,
            onSuccess(response) {
                if (!countNumberOfCorrectAnswer(response.questions)) {
                    clearInterval(timerId)
                    setIsFinish(true)
                    setCurrentQuiz(response)
                } else {
                    setTimeout(() => {
                        clearInterval(timerId)
                        setIsFinish(true)
                        setCurrentQuiz(response)
                    }, 1000)
                }
            },
        })

    const handleSubmitQuiz = () => {
        currentQuiz &&
            submitQuizAnswer({
                gameId: currentQuiz.gameId,
                answers: currentQuiz.questions.map((question, index) => {
                    return {
                        questionId: question._id,
                        answer: answers[index],
                    }
                }),
            })
    }

    const handleStartPlayingQuiz = () => {
        getQuizDetail({
            id: quiz._id,
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

    const handleCloseModal = () => {
        if (isFinish) {
            getLearningCourseDetail({})
        }
        handleShowModal(false)
    }

    useEffect(() => {
        dispatch(
            updateGlobalLoadingState(
                isLoadingSubmitQuizAnswer || isLoadingGetQuizDetail,
            ),
        )
    }, [isLoadingSubmitQuizAnswer, isLoadingGetQuizDetail])

    return (
        <>
            {showModal ? (
                <>
                    <div
                        className={`${
                            isPerfectScore ? 'hidden' : 'flex'
                        } justify-center items-center fixed inset-0 z-40 outline-none focus:outline-none`}
                    >
                        <div className="relative">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="px-10 my-12 max-h-[550px] overflow-y-auto scrollbar">
                                    <div className="text-xl font-bold px-6 pb-5">
                                        Quiz: {quiz.name}
                                    </div>
                                    {!isStart ? (
                                        <>
                                            <div className="text-lg font-medium px-6 pb-5">
                                                {isCurrentLessonLearned
                                                    ? 'Try your best to complete this quiz with the perfect score!'
                                                    : `Completed this quiz before moving to the
                                        next lesson!`}
                                            </div>
                                            <div className="flex justify-center">
                                                <Button
                                                    className="btn-primary mt-5"
                                                    onClick={() =>
                                                        handleStartPlayingQuiz()
                                                    }
                                                >
                                                    <div className="font-medium text-center px-10">
                                                        Start
                                                    </div>
                                                </Button>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="flex justify-center w-full font-bold text-2xl pb-5">
                                                {!isFinish
                                                    ? timer
                                                    : `${numberOfCorrectAnswer}/${totalQuestions}`}
                                            </div>
                                            <div className="space-y-5 max-w-3xl">
                                                {currentQuiz &&
                                                    currentQuiz.questions.map(
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
                                                                                    className={`flex justify-between items-center rounded-[80px] cursor-pointer ${
                                                                                        !question?.correctAnswer &&
                                                                                        !isFinish &&
                                                                                        'hover:bg-primary-hover hover:border-primary-hover hover:text-white'
                                                                                    } py-3 px-6 border-2 font-medium ${
                                                                                        answers[
                                                                                            questionIndex
                                                                                        ] ===
                                                                                            choiceIndex &&
                                                                                        !isFinish
                                                                                            ? 'bg-primary border-primary text-white'
                                                                                            : 'bg-white'
                                                                                    } ${
                                                                                        isFinish &&
                                                                                        (choiceIndex ===
                                                                                        question?.correctAnswer
                                                                                            ? `bg-green-400 bg-opacity-10 text-green-400 border-green-400`
                                                                                            : answers[
                                                                                                  questionIndex
                                                                                              ] ===
                                                                                                  choiceIndex &&
                                                                                              `bg-red-400 bg-opacity-10 text-red-400 border-red-400`)
                                                                                    }`}
                                                                                    onClick={() =>
                                                                                        !isFinish &&
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
                                                                                    {isFinish &&
                                                                                        (choiceIndex ===
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
                                                                                                choiceIndex && (
                                                                                                <FontAwesomeIcon
                                                                                                    icon={
                                                                                                        faCircleXmark
                                                                                                    }
                                                                                                    className="text-[20px] text-red-400 ml-2"
                                                                                                />
                                                                                            )
                                                                                        ))}
                                                                                </div>
                                                                            ),
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            )
                                                        },
                                                    )}
                                            </div>
                                            {!isFinish && (
                                                <Button
                                                    className="btn-primary mt-10 w-full"
                                                    onClick={() =>
                                                        handleSubmitQuiz()
                                                    }
                                                    disabled={
                                                        !(
                                                            timer !==
                                                                "Time's up!" &&
                                                            answers.filter(
                                                                (item) => item,
                                                            ).length !==
                                                                totalQuestions
                                                        )
                                                    }
                                                >
                                                    <div className="font-medium w-full text-center">
                                                        Submit
                                                    </div>
                                                </Button>
                                            )}
                                        </>
                                    )}
                                </div>
                                <div
                                    className="absolute top-5 right-5 cursor-pointer bg-gray-300 px-2 rounded-full"
                                    onClick={() => handleCloseModal()}
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
