import * as React from 'react'
import Label from '@/components/core/label'
import RatingStar from '../rating-star'
import Router from 'next/router'
import { CoursePreview } from '@/api/dto/course.dto'
import { COURSE_ID } from '@/constants/localStorage'

export interface IHorizontalCourseCardProps {
    data: CoursePreview
    className?: string
    clickMode: 'view' | 'edit'
    setClicked?: React.Dispatch<React.SetStateAction<boolean>>
    showDetail?: boolean
    showStatus?: boolean
}

export default function HorizontalCourseCard({
    data,
    className,
    clickMode,
    setClicked,
    showDetail = true,
    showStatus = false,
}: IHorizontalCourseCardProps) {
    const handleCourseClick = () => {
        if (setClicked) {
            setClicked(true)
        }

        if (clickMode === 'view') {
            Router.push(`/course/${data._id}`)
        } else {
            localStorage.setItem(COURSE_ID, data._id)
            Router.push(`/update-course/${data._id}/landing-page`)
        }
    }
    return (
        <div
            className={`flex items-start space-x-5 cursor-pointer hover:bg-gray-300 ${className}`}
            onClick={() => handleCourseClick()}
        >
            <img
                src={
                    data.thumbnail ??
                    'https://img-c.udemycdn.com/course/750x422/437398_46c3_10.jpg'
                }
                alt=""
                className="mt-1 w-[25%]"
            />
            <div className="space-y-3">
                <div>
                    <div className="font-semibold text-xl line-clamp-2 h-[60px]">
                        {data.name}
                    </div>
                </div>
                {showDetail && (
                    <>
                        <RatingStar
                            id={data._id}
                            ratingScore={data.rating}
                            ratings={data.ratingCount.toString()}
                        />
                        <div className="font-bold text-xl">
                            {data.price} USDT
                        </div>
                    </>
                )}
                <div className="flex space-x-3">
                    {showStatus && (
                        <>
                            <Label
                                name={
                                    data.approved ? 'Approved' : 'Not Approved'
                                }
                                color={data.approved ? '#22C55E' : '#E11D48'}
                            />
                            <Label
                                name={
                                    data.approved && data.courseId
                                        ? 'Minted'
                                        : 'Not Minted'
                                }
                                color={
                                    data.approved && data.courseId
                                        ? '#22C55E'
                                        : '#E11D48'
                                }
                            />
                        </>
                    )}
                    <Label
                        name={data.category.name}
                        color={data.category.color}
                    />
                </div>
            </div>
        </div>
    )
}
