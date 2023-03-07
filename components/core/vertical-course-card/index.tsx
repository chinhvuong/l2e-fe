import * as React from 'react'
import Label from '@/components/core/label'
import RatingStar from '../rating-star'
import Router from 'next/router'
import { CoursePreview } from '@/api/dto/course.dto'
import { updateCourseIdState } from '@/store/course'
import { useAppDispatch } from '@/hooks'
import VideoPreview from '../video-preview'

export interface IVerticalCourseCardProps {
    data: any
    className?: string
}

export default function VerticalCourseCard({
    data,
    className,
}: IVerticalCourseCardProps) {
    const dispatch = useAppDispatch()
    const viewCourseDetail = () => {
        dispatch(updateCourseIdState(Number(data.courseId)))
        Router.push(`/course/${data._id}`)
    }
    return (
        <div
            className={`space-y-3 cursor-pointer ${className}`}
            onClick={() => viewCourseDetail()}
        >
            <img
                src={
                    data.thumbnail ??
                    'https://img-c.udemycdn.com/course/750x422/437398_46c3_10.jpg'
                }
                alt=""
            />
            <div className="font-semibold text-lg line-clamp-3 h-[80px]">
                {data.name}
            </div>
            <div className="font-light text-xs truncate">
                {data?.author?.name ?? 'Anonymous'}
            </div>
            <RatingStar
                id={data._id}
                ratingScore={data.rating}
                ratings={data.ratingCount.toString()}
            />
            <div className="font-bold">{data.price} USDT</div>
            <div className="flex gap-x-2">
                {/* <Label name="Bestseller" hidden={!data.isBestseller} /> */}
                <Label name={data.category.name} color={data.category.color} />
            </div>
        </div>
    )
}
