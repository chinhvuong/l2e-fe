import { useEffect, useState } from 'react'
import Button from '../button'
import { useLearningCourseContext } from '@/containers/learn-course/learning-course-context'

interface ICorrectQuizAnswerModalProps {
    isShow: boolean
    setIsShow: (state: boolean) => void
}

export default function CorrectQuizAnswerModal(
    props: ICorrectQuizAnswerModalProps,
) {
    const { isShow, setIsShow } = props
    const [showModal, setShowModal] = useState(isShow)
    const { handlePerfectScore } = useLearningCourseContext()

    useEffect(() => {
        setShowModal(isShow)
    }, [isShow])

    const handleShowModal = (value: boolean) => {
        handlePerfectScore(false)
        setShowModal(value)
        setIsShow(value)
    }

    return (
        <>
            {showModal ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full overflow-x-hidden bg-white outline-none focus:outline-none px-10 py-7">
                                <div className="flex justify-center">
                                    <div className="w-40">
                                        <video
                                            src="/videos/wallet-with-coins.mp4"
                                            autoPlay
                                            loop
                                            muted
                                        ></video>
                                    </div>
                                </div>
                                <div>
                                    <div className="text-center text-2xl font-bold">
                                        Congratulation!
                                    </div>
                                    <div className="text-center text-md pt-3">
                                        You completed the quiz correctly for the
                                        first time! Claim your reward!
                                    </div>
                                    <div className="flex justify-center mt-7">
                                        <Button
                                            className="btn-primary"
                                            onClick={() =>
                                                handleShowModal(false)
                                            }
                                        >
                                            <div className="font-medium text-center">
                                                Close
                                            </div>
                                        </Button>
                                    </div>
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
