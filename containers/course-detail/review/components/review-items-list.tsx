import Button from '@/components/core/button'
import Divider from '@/components/core/divider'
import { Rating } from '@/store/rating/types'
import { useEffect, useState } from 'react'
import ReviewItem from './review-item'

export interface IReviewItemsListProps {
    ratings: Rating[]
    isLearn: boolean
}

export default function ReviewItemsList({
    ratings,
    isLearn,
}: IReviewItemsListProps) {
    const [numberOfShowedRatings, setNumberOfShowedRating] = useState(1)
    const [reviewList, setReviewList] = useState(
        ratings.slice(0, numberOfShowedRatings),
    )
    const updateReviewList = () => {
        const newTotal = numberOfShowedRatings + 1
        setNumberOfShowedRating(newTotal)
        setReviewList(ratings.slice(0, newTotal))
    }
    useEffect(() => {
        if (ratings.length !== 0) {
            setReviewList(ratings.slice(0, numberOfShowedRatings))
        }
    }, [ratings])

    return (
        <div>
            {reviewList.map((item, index) => {
                return (
                    <div className="space-y-6" key={index}>
                        <ReviewItem data={item} isLearn={isLearn} />
                        {index !== reviewList.length - 1 && <Divider />}
                    </div>
                )
            })}
            {ratings.length > numberOfShowedRatings && (
                <Button
                    className="btn-primary-outline w-full mt-5"
                    onClick={() => updateReviewList()}
                >
                    <div className="font-medium text-[16px] text-center w-full">
                        Show more reviews
                    </div>
                </Button>
            )}
        </div>
    )
}
