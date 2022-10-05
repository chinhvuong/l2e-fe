import * as React from 'react'
import Label from '@/components/core/label'
import RatingStar from './ratingStar'
import { CourseInfo_Preview } from '@/constants/interfaces'
import Router from 'next/router'

export interface ICourseCardProps {
    info: CourseInfo_Preview
    className: string
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
            <img src={props.info.thumbnail} alt="" />
            <div className="font-semibold text-lg line-clamp-3 h-[80px]">
                {props.info.title}
            </div>
            <div className="font-light text-xs truncate">
                {props.info.authors}
            </div>
            <RatingStar
                id={props.info.id}
                ratingScore={props.info.ratingScore}
                ratings={props.info.ratings}
            />
            <div className="font-bold">{props.info.price}</div>
            <div className="flex gap-x-2">
                <Label type="bestseller" hidden={!props.info.isBestseller} />
                <Label type={props.info.category} />
            </div>
        </div>
    )
}
