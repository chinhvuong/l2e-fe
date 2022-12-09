import * as React from 'react'
import Label from '@/components/core/label'
import RatingStar from '../rating-star'
import Router from 'next/router'
import { CoursePreview } from '@/api/dto/course.dto'
import course from '@/store/course'

export interface IHorizontalCourseCardProps {
    data: CoursePreview
    className?: string
}

export default function HorizontalCourseCard(
    props: IHorizontalCourseCardProps,
) {
    const viewCourseDetail = () => {
        Router.push(`/course/${props.data._id}`)
    }
    return (
        <div
            className={`flex items-start space-x-5 cursor-pointer ${props.className}`}
            onClick={() => viewCourseDetail()}
        >
            <img
                src="https://img-c.udemycdn.com/course/750x422/437398_46c3_10.jpg"
                alt=""
                className="mt-1 w-[25%]"
            />
            <div className="space-y-3">
                <div>
                    <div className="font-semibold text-lg line-clamp-2 h-[60px]">
                        {props.data.name}
                    </div>
                    <div className="font-light text-xs truncate">
                        {props.data?.author?.name ?? 'Anonymous'}
                    </div>
                </div>
                <RatingStar
                    id={props.data._id}
                    ratingScore={props.data.rating}
                    ratings={props.data.ratingCount.toString()}
                />
                <div className="font-bold text-xl">{props.data.price}</div>
                <div className="space-y-2">
                    <div className="text-xs">
                        101 sections • 676 lectures • 64h 2m total length
                    </div>
                    <div className="flex gap-x-2 flex-wrap">
                        {/* <Label
                            name="Bestseller"
                            hidden={!props.data.isBestseller}
                        /> */}
                        <Label
                            name={props.data.category.name}
                            color={props.data.category.color}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
