import RatingStar from '@/components/core/rating-star'
import * as React from 'react'

export interface IRatingAnalysisBarProps {
    percent: number
    star: number
}

export default function RatingAnalysisBar(props: IRatingAnalysisBarProps) {
    const id = (props.percent + props.star).toString()

    return (
        <div className="flex items-center space-x-5">
            <div className="relative bg-border-box w-[420px] lg:w-[270px] md:w-[200px] sm:w-[25vw] h-[10px] rounded-[80px]">
                <div
                    className={`h-[10px] rounded-[80px] bg-description absolute z-10}`}
                    style={{ width: `${props.percent}%` }}
                ></div>
            </div>
            <div className="mb-1">
                <RatingStar id={id} ratingScore={props.star} hideScore />
            </div>
            <div className="text-hyperlink font-semibold">{`${props.percent}%`}</div>
        </div>
    )
}
