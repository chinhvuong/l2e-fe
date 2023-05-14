import { CoursePreview } from '@/api/dto/course.dto'
import Label from '@/components/core/label'
import { COURSE_ID } from '@/constants/localStorage'
import { useAppDispatch } from '@/hooks'
import { resetCourseDetailStore } from '@/store/course'
import { resetCurriculumStore } from '@/store/course/curriculum'
import { resetIntendedLearnersStore } from '@/store/course/intended-learners'
import Router from 'next/router'
import * as React from 'react'
import RatingStar from '../rating-star'

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
    const dispatch = useAppDispatch()
    const handleCourseClick = () => {
        if (setClicked) {
            dispatch(resetCourseDetailStore())
            dispatch(resetCurriculumStore())
            dispatch(resetIntendedLearnersStore())
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
            className={`flex w-full space-x-5 cursor-pointer hover:bg-gray-300 p-5 ${className}`}
            onClick={() => handleCourseClick()}
        >
            <img
                src={data.thumbnail ?? '/images/placeholder.jpeg'}
                alt=""
                className="under_xl:w-[120px] h-fit w-[25%]"
            />
            <div className="space-y-3">
                <div>
                    <div className="font-semibold text-xl line-clamp-2 under_xl:line-clamp-1 under_xl:text-base">
                        {data.name}
                    </div>
                </div>
                {showDetail && (
                    <>
                        <RatingStar
                            id={data._id}
                            ratingScore={data.rating}
                            ratings={
                                data?.ratingCount
                                    ? data.ratingCount.toString()
                                    : ''
                            }
                        />
                        <div className="font-bold text-xl under_xl:text-sm">
                            {data.price} USDT
                        </div>
                    </>
                )}
                <div className="flex gap-3 flex-wrap">
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
