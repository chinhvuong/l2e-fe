import * as React from 'react'
import Label from '@/components/core/label'
import RatingStar from '../rating-star'
import Router from 'next/router'
import { CoursePreview } from '@/api/dto/course.dto'

export interface IVerticalCourseCardProps {
    data: CoursePreview
    className?: string
}

export default function VerticalCourseCard(props: IVerticalCourseCardProps) {
    const viewCourseDetail = () => {
        Router.push(`/course/${props.data._id}`)
    }
    return (
        <div
            className={`space-y-3 cursor-pointer ${props.className}`}
            onClick={() => viewCourseDetail()}
        >
            <img
                src="https://img-c.udemycdn.com/course/750x422/437398_46c3_10.jpg"
                alt=""
            />
            <div className="font-semibold text-lg line-clamp-3 h-[80px]">
                {props.data.name}
            </div>
            <div className="font-light text-xs truncate">
                {props.data.author.name ?? 'Anonymous'}
            </div>
            <RatingStar
                id={props.data._id}
                ratingScore={props.data.rating}
                ratings={props.data.ratingCount.toString()}
            />
            <div className="font-bold">{props.data.price}</div>
            <div className="flex gap-x-2">
                {/* <Label name="Bestseller" hidden={!props.data.isBestseller} /> */}
                <Label name={props.data.category.name} />
            </div>
        </div>
    )
}
