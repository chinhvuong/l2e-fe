import React from 'react'
import { CourseInfo_Preview } from '@/constants/interfaces'
import HorizontalCourseCard from '@/components/core/horizontal-course-card'

export interface IVerticalCourseListProps {
    title?: string
    data: CourseInfo_Preview[]
    className?: string
}

export default function VerticalCourseList(props: IVerticalCourseListProps) {
    return (
        <div className={props.className}>
            <div
                className={`flex justify-center ${props.title ? 'hidden' : ''}`}
            >
                <div className="2xl:w-[805px] xl:w-[805px] lg:w-[635px] md:w-[485px] sm:w-[285px] mb-[10px]">
                    <div className="font-semibold text-[30px]">
                        {props.title}
                    </div>
                </div>
            </div>
            <div className="space-y-5">
                {props.data.map((course) => {
                    return (
                        <HorizontalCourseCard key={course.id} data={course} />
                    )
                })}
            </div>
        </div>
    )
}
