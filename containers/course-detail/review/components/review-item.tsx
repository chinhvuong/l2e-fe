import RatingStar from '@/components/core/course-card/rating-star'
import { useState, useEffect } from 'react'
import {
    faChevronDown,
    faChevronUp,
    faThumbsUp,
    faThumbsDown,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export interface IReviewItemProps {
    data: number
}

type LikeReviewState = 'like' | 'dislike' | 'none'

export default function ReviewItem(props: IReviewItemProps) {
    const [elHeight, setElHeight] = useState(0)
    const [showFullContent, setShowFullContent] = useState(false)
    const [isLiked, setIsLiked] = useState<LikeReviewState>('none')

    useEffect(() => {
        setElHeight(
            document.getElementById(`instructor-${props.data}`)?.scrollHeight ??
                0,
        )
    }, [])

    const onChangeLikeReview = (newState: LikeReviewState) => {
        isLiked === newState ? setIsLiked('none') : setIsLiked(newState)
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
                    <div className="font-bold mt-1">David K.</div>
                    <div className="flex items-center space-x-5">
                        <RatingStar id={1} ratingScore={4} hideScore />
                        <div className="text-description mb-1">1 year ago</div>
                    </div>
                </div>
            </div>
            <div
                id={`instructor-${props.data}`}
                className={`space-y-3 overflow-hidden relative ml-[80px] ${
                    elHeight > 200 && !showFullContent && 'h-[200px]'
                }`}
            >
                <div className="text-justify">
                    Left mouse pointer on text frequently. Recording setup
                    picked up heavy key strikes making listening difficult.
                    Solved problems well as they came. Covered many functions of
                    python and seemed knowledgeable. Left mouse pointer on text
                    frequently. Recording setup picked up heavy key strikes
                    making listening difficult. Solved problems well as they
                    came. Covered many functions of python and seemed
                    knowledgeable. Left mouse pointer on text frequently.
                    Recording setup picked up heavy key strikes making listening
                    difficult. Solved problems well as they came. Covered many
                    functions of python and seemed knowledgeable. Left mouse
                    pointer on text frequently. Recording setup picked up heavy
                    key strikes making listening difficult. Solved problems well
                    as they came. Covered many functions of python and seemed
                    knowledgeable. Left mouse pointer on text frequently.
                    Recording setup picked up heavy key strikes making listening
                    difficult. Solved problems well as they came. Covered many
                    functions of python and seemed knowledgeable.
                </div>
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
            <div className="ml-[80px] mt-4 space-y-3">
                <div>Was this review helpful?</div>
                <div className="flex items-center space-x-5">
                    <FontAwesomeIcon
                        icon={faThumbsUp}
                        className={`text-[25px] cursor-pointer hover:text-green-500 ${
                            isLiked === 'like' && 'text-green-500'
                        }`}
                        onClick={() => onChangeLikeReview('like')}
                    />
                    <FontAwesomeIcon
                        icon={faThumbsDown}
                        className={`text-[25px] cursor-pointer hover:text-red-500 ${
                            isLiked === 'dislike' && 'text-red-500'
                        }`}
                        onClick={() => onChangeLikeReview('dislike')}
                    />
                    <div className="underline cursor-pointer">Report</div>
                </div>
            </div>
        </div>
    )
}
