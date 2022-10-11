import RatingStar from '@/components/core/course-card/rating-star'
import { useState } from 'react'
import { Rating } from '@/constants/interfaces'
import ShowMore from '@/components/core/show-more'

export interface IReviewItemProps {
    data: Rating
}

export default function ReviewItem(props: IReviewItemProps) {
    const [elHeight, setElHeight] = useState('')

    const getTimeAgo = () => {
        const yearAgo =
            new Date().getFullYear() - props.data.updatedAt.getFullYear()
        const monthAgo = new Date().getMonth() - props.data.updatedAt.getMonth()
        const dayAgo = new Date().getDate() - props.data.updatedAt.getDate()
        const hourAgo = new Date().getHours() - props.data.updatedAt.getHours()

        if (yearAgo > 1) {
            return `${yearAgo} years ago`
        } else if (yearAgo === 1) {
            return `1 year ago`
        } else if (monthAgo > 1) {
            return `${monthAgo} months ago`
        } else if (monthAgo === 1) {
            return `1 month ago`
        } else if (dayAgo > 1) {
            return `${dayAgo} day ago`
        } else if (dayAgo === 1) {
            return 'yesterday'
        } else if (hourAgo > 1) {
            return `${hourAgo} hours ago`
        } else if (hourAgo === 1) {
            return `1 hour ago`
        } else {
            return 'recently'
        }
    }

    return (
        <div>
            <div className="flex items-center my-4 space-x-5">
                <img
                    src="/images/avatar.jpg"
                    alt=""
                    className="rounded-[50%] w-[60px]"
                />
                <div className="space-y-2">
                    <div className="font-bold mt-1">{props.data.user}</div>
                    <div className="flex items-center space-x-5">
                        <RatingStar id={1} ratingScore={4} hideScore />
                        <div className="text-description mb-1">
                            {getTimeAgo()}
                        </div>
                    </div>
                </div>
            </div>
            <div
                id={`review-${props.data._id}`}
                className={`space-y-3 overflow-hidden relative ml-[80px] ${elHeight}`}
            >
                <div className="text-justify">{props.data.comment}</div>
                <ShowMore
                    el={`review-${props.data._id}`}
                    elHeightPreview={200}
                    changeElHeight={setElHeight}
                />
            </div>
        </div>
    )
}
