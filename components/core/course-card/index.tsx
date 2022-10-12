import * as React from 'react'
import Label from '@/components/core/label'
import RatingStar from './rating-star'
import { CourseInfo_Preview } from '@/constants/interfaces'
import Router from 'next/router'

export interface ICourseCardProps {
    data: CourseInfo_Preview
    className?: string
}

export default function CourseCard(props: ICourseCardProps) {
    const viewCourseDetail = () => {
        Router.push('/course/1')
    }
    return (
        <div
            className={`space-y-3 cursor-pointer ${props.className}`}
            onClick={() => viewCourseDetail()}
        >
            <img src={props.data.thumbnail} alt="" />
            <div className="font-semibold text-lg line-clamp-3 h-[80px]">
                {props.data.title}
            </div>
            <div className="font-light text-xs truncate">
                {props.data.author}
            </div>
            <RatingStar
                id={props.data.id}
                ratingScore={props.data.ratingScore}
                ratings={props.data.ratings}
            />
            <div className="font-bold">{props.data.price}</div>
            <div className="flex gap-x-2">
                <Label name="Bestseller" hidden={!props.data.isBestseller} />
                <Label name={props.data.category} />
            </div>
        </div>
    )
}
