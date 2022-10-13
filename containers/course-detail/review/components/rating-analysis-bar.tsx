import RatingStar from '@/components/core/rating-star'
import * as React from 'react'

export interface IRatingAnalysisBarProps {
    percent: number
    star: number
}

export default function RatingAnalysisBar(props: IRatingAnalysisBarProps) {
    return (
        <div className="flex items-center space-x-5">
            <div className="relative bg-border-box w-[420px] lg:w-[270px] md:w-[200px] sm:w-[25vw] h-[10px] rounded-[80px]">
                <div
                    className={`h-[10px] rounded-[80px] bg-description absolute z-10}`}
                    style={{ width: `${props.percent}%` }}
                ></div>
            </div>
            <RatingStar
                id={props.percent + props.star}
                ratingScore={props.star}
                hideScore
            />
            <div className="text-hyperlink underline font-semibold">{`${props.percent}%`}</div>
        </div>
    )
}
