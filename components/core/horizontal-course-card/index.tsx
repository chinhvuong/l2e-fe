import * as React from 'react'
import Label from '@/components/core/label'
import RatingStar from '../rating-star'
import { CourseInfo_Preview } from '@/constants/interfaces'
import Router from 'next/router'

export interface IHorizontalCourseCardProps {
    data: CourseInfo_Preview
    className?: string
}

export default function HorizontalCourseCard(
    props: IHorizontalCourseCardProps,
) {
    const viewCourseDetail = () => {
        Router.push('/course/1')
    }
    return (
        <div
            className={`flex items-start space-x-5 cursor-pointer ${props.className}`}
            onClick={() => viewCourseDetail()}
        >
            <img src={props.data.thumbnail} alt="" className="mt-1 w-[25%]" />
            <div className="space-y-3">
                <div>
                    <div className="font-semibold text-lg line-clamp-2 h-[60px]">
                        {props.data.title}
                    </div>
                    <div className="font-light text-xs truncate">
                        {props.data.author}
                    </div>
                </div>
                <RatingStar
                    id={props.data.id}
                    ratingScore={props.data.ratingScore}
                    ratings={props.data.ratings}
                />
                <div className="font-bold text-xl">{props.data.price}</div>
                <div className="space-y-2">
                    <div className="text-xs">
                        101 sections • 676 lectures • 64h 2m total length
                    </div>
                    <div className="flex gap-x-2 flex-wrap">
                        <Label
                            name="Bestseller"
                            hidden={!props.data.isBestseller}
                        />
                        <Label name={props.data.category} />
                    </div>
                </div>
            </div>
        </div>
    )
}
