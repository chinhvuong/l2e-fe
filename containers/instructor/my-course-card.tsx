import { CoursePreview } from '@/api/dto/course.dto'
import Loading from '@/components/core/animate/loading'
import Button from '@/components/core/button'
import React, { useState } from 'react'
import MintBtn from './mint-btn'
import Router from 'next/router'
import { COURSE_ID } from '@/constants/localStorage'
import useAPI from '@/api/hooks/useAPI'
import { InstructorAPI } from '@/api/api-path'
import LoadingScreen from '@/components/core/animate/loading-screen'
import { updateIdState } from '@/store/course'
import { useAppDispatch } from '@/hooks'

type Props = {
    course: CoursePreview
}
const MyCourseCard = ({ course }: Props) => {
    const [sendApprove, setSendApprove] = useState(false)
    const dispatch = useAppDispatch()
    const handleRequestApprove = async (id: string) => {
        requestApprove({ id, notes: [] })
    }

    const { mutate: requestApprove, isLoading: isLoadingRequestApprove } =
        useAPI.post(InstructorAPI.REQUEST_APPROVE, {
            onSuccess(response) {
                setSendApprove(true)
            },
            onError(error) {
                setSendApprove(true)
            },
        })

    const goToUpdateCoursePage = () => {
        localStorage.setItem(COURSE_ID, course._id)
        Router.push(`/update-course/${course._id}/landing-page`)
    }
    const goToQuestionPage = () => {
        console.log(course._id)
        localStorage.setItem(COURSE_ID, course._id)
        dispatch(updateIdState(course._id))
        Router.push(`instructor/${course._id}/question/`)
    }

    return (
        <>
            <LoadingScreen isLoading={isLoadingRequestApprove} />
            <div key={course._id} className="bg-red-200 p-4 shadow-md">
                <div>
                    <img
                        src="https://img-c.udemycdn.com/course/750x422/437398_46c3_10.jpg"
                        alt=""
                        className="w-full"
                    />
                </div>
                <div className="font-semibold text-lg mt-4">
                    <h1>{course.name}</h1>
                    <div className="font-bold text-xl">
                        {course.price | 0} USDT
                    </div>
                </div>
                <div className={`flex justify-end gap-4 text-white mt-4`}>
                    {!course.approved && (
                        <Button
                            className="flex items-center gap-4 p-1 text-sm"
                            onClick={() => handleRequestApprove(course._id)}
                            disabled={sendApprove || isLoadingRequestApprove}
                        >
                            <span>Request Approve</span>
                            {isLoadingRequestApprove && (
                                <Loading className="!text-white" />
                            )}
                        </Button>
                    )}

                    {course.approved && !course.courseId && (
                        <MintBtn id={course._id} />
                    )}

                    {course.approved && course.courseId && (
                        <Button
                            className="flex gap-4 p-1 text-sm"
                            onClick={() => alert('Coming soon')}
                        >
                            <span>View Detail</span>
                            {isLoadingRequestApprove && (
                                <Loading className="!text-white" />
                            )}
                        </Button>
                    )}

                    <Button
                        className="flex gap-4 p-1 text-sm"
                        onClick={() => goToUpdateCoursePage()}
                    >
                        <span>Edit</span>
                    </Button>
                </div>
                <div className={`flex justify-end gap-4 text-white mt-4`}>
                    <Button
                        className="flex gap-4 p-1 text-sm"
                        onClick={() => goToQuestionPage()}
                    >
                        <span>Question Bank</span>
                    </Button>
                </div>
            </div>
        </>
    )
}

export default MyCourseCard
