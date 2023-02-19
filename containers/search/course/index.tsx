import { CoursePreview } from '@/api/dto/course.dto'
// import HorizontalCourseCard from '@/components/core/horizontal-course-card'
import React, { useState } from 'react'
import Router from 'next/router'
import useAPI from '@/api/hooks/useAPI'
import { InstructorAPI } from '@/api/api-path'
import RatingStar from '@/components/core/rating-star'

type Props = {
    course: CoursePreview
}
const MyCourseCard = ({ course }: Props) => {
    const [sendApprove, setSendApprove] = useState(false)

    const handleRequestApprove = async (id: string) => {
        requestApprove({ id, notes: [] })
    }

    const { mutate: requestApprove, isLoading } = useAPI.post(
        InstructorAPI.REQUEST_APPROVE,
        {
            onSuccess(response) {
                setSendApprove(true)
            },
            onError(error) {
                setSendApprove(true)
            },
        },
    )

    const goToPreviewCoursePage = (id: string) => {
        Router.push(id)
    }

    return (
        <div
            key={course._id}
            className="p-4 shadow-md flex"
            onClick={() => goToPreviewCoursePage(course._id)}
        >
            <div className="w-3/12">
                <img
                    src="https://img-c.udemycdn.com/course/750x422/437398_46c3_10.jpg"
                    alt=""
                />
            </div>
            <div className="font-semibold text-lg w-1/2  p-4">
                <div className="font-bold">{course.name}</div>
                <div className="font-light text-xs truncate">
                    Author: {course.author.walletAddress}
                </div>
                <RatingStar
                    ratings={course.rating.toString()}
                    id={course._id}
                    ratingScore={course.rating}
                />
            </div>
            <div className="w-1/4">
            <h1 className="pl-20 font-bold">{course.price | 0} USDT</h1>
            </div>
        </div>
    )
}

export default MyCourseCard
