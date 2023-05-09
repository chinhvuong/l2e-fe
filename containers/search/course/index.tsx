import { CoursePreview } from '@/api/dto/course.dto'
import RatingStar from '@/components/core/rating-star'
import Router from 'next/router'
import { useState } from 'react'

type Props = {
    course: CoursePreview
}
const MySearchCourseCard = ({ course }: Props) => {
    const [sendApprove, setSendApprove] = useState(false)

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
                    ratings={course?.rating ? course.rating.toString() : ''}
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

export default MySearchCourseCard
