import RatingStar from '@/components/core/course-card/rating-star'
import { useState, useEffect } from 'react'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Rating } from '@/constants/interfaces'

export interface IReviewItemProps {
    data: Rating
}

export default function ReviewItem(props: IReviewItemProps) {
    const [elHeight, setElHeight] = useState(0)
    const [showFullContent, setShowFullContent] = useState(false)

    useEffect(() => {
        setElHeight(
            document.getElementById(`instructor-${props.data._id}`)
                ?.scrollHeight ?? 0,
        )
    }, [])

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
                id={`instructor-${props.data._id}`}
                className={`space-y-3 overflow-hidden relative ml-[80px] ${
                    elHeight > 200 && !showFullContent && 'h-[200px]'
                }`}
            >
                <div className="text-justify">{props.data.comment}</div>
                <div
                    className={`flex flex-col justify-end z-10 top-1 left-0 w-full h-full ${
                        elHeight <= 200 && 'hidden'
                    } ${!showFullContent && 'absolute'} `}
                >
                    <div
                        className={`h-full ${
                            !showFullContent &&
                            'bg-gradient-to-b from-transparent to-white'
                        }`}
                    ></div>
                    <div
                        className={`cursor-pointer ${
                            !showFullContent && 'pb-5 bg-white'
                        }`}
                        onClick={() => setShowFullContent(!showFullContent)}
                    >
                        <span className="text-hyperlink font-bold mr-2">
                            Show {!showFullContent ? 'more' : 'less'}
                        </span>
                        <FontAwesomeIcon
                            icon={
                                !showFullContent ? faChevronDown : faChevronUp
                            }
                            className="text-hyperlink"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
