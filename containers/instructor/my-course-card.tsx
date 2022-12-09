import { CoursePreview } from '@/api/dto/course.dto'
import Loading from '@/components/core/animate/loading'
import Button from '@/components/core/button'
// import HorizontalCourseCard from '@/components/core/horizontal-course-card'
import React, { useState } from 'react'
import { apiCourse } from '@/api/functions/api-course'
import MintBtn from './mint-btn'
type Props = {
    course: CoursePreview
}
const MyCourseCard = ({ course }: Props) => {
    console.log("🚀 ~ file: my-course-card.tsx:10 ~ MyCourseCard ~ course", course)
    const [isLoading, setIsLoading] = useState(false)
    const [sendApprove, setSendApprove] = useState(false)

    const requestApprove = async (id: string) => {
        // await axios.post(
        //     'https://l2e-be-v1.herokuapp.com/course/manage/own-courses/send-approve-request',
        //     {
        //         id: id,
        //         notes: [''],
        //     },
        // )
        setIsLoading(true)
        try {
            const rs = await apiCourse.requestApprove({ id, notes: [] })
            console.log("🚀 ~ file: my-course-card.tsx:26 ~ requestApprove ~ rs", rs)
            if (rs.success) {
                setSendApprove(true)
            }
            setIsLoading(false)

        } catch (error) {
            setIsLoading(false)
            setSendApprove(true)
            // alert("Error occur")s
        }
    }
    const mintCourse = async (id: string) => {
        // setCourseId(id)
    }

    return (
        <div
            key={course._id}
            className="bg-red-200 p-4 shadow-md"
        >
            {/* <HorizontalCourseCard
                key={course._id}
                data={course}
            /> */}
            <div className="">
                <img
                    src="https://img-c.udemycdn.com/course/750x422/437398_46c3_10.jpg"
                    alt=""
                    className="w-full"
                />
            </div>
            <div className="font-semibold text-lg mt-4">
                <h1>{course.name}</h1>
                <div className="font-light text-xs truncate">
                    Author: You
                </div>
                <div className="font-bold text-xl">{course.price | 0} USDT</div>
            </div>
            <div
                className={`flex justify-end gap-4 text-white mt-4`}
            >
                {
                    !course.approved && (
                        <Button
                            className='flex items-center gap-4 p-1 text-sm'
                            onClick={() =>
                                requestApprove(course._id)
                            }
                            disabled={sendApprove || isLoading}
                        >
                            <span>Request Approve</span>
                            {isLoading && <Loading className='!text-white' />}
                        </Button>
                    )

                }

                {
                    course.approved && !course.courseId && (
                        <MintBtn id={course._id} />
                    )

                }

                {
                    course.approved && course.courseId && (
                        <Button
                            className='flex gap-4 p-1 text-sm'
                            onClick={() =>
                                alert('Coming soon')
                            }
                        >
                            <span>View Detail</span>
                            {isLoading && <Loading className='!text-white' />}
                        </Button>
                    )

                }

                <Button
                    className='flex gap-4 p-1 text-sm'
                    onClick={() =>
                        alert("Coming soon")
                    }
                >
                    <span>Edit</span>
                    {/* {isLoading && <Loading className='!text-white' />} */}
                </Button>
            </div>
            {/* <div
                className={`flex justify-center text-white pr-14 ${!course?.courseId &&
                    !course.approved
                    ? ''
                    : 'hidden'
                    }`}
            >
                <Button
                    onClick={() =>
                        approve(course._id)
                    }
                >
                    Request Approve
                </Button>
            </div>
            <div
                className={`flex justify-center text-white ${!course?.courseId &&
                    course.approved &&
                    isLoading
                    ? ''
                    : 'hidden'
                    }`}
            >
                <Loading />
            </div> */}
        </div>
    )
}

export default MyCourseCard