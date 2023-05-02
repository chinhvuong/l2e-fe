import Button from '@/components/core/button'
import Divider from '@/components/core/divider'
import { useLearningCourseContext } from '@/containers/learn-course/learning-course-context'
import { useEffect, useState } from 'react'
import ReviewItem from './review-item'
import { Rating } from '@/store/rating/types'
import { UseMutateFunction } from '@tanstack/react-query'

export interface IReviewItemsListProps {
    ratings: Rating[]
    isLearn: boolean
}

export default function ReviewItemsList(props: IReviewItemsListProps) {
    const [numberOfShowedRating, setNumberOfShowedRating] = useState(3)
    const [reviewList, setReviewList] = useState([] as Rating[])
    const updateReviewList = () => {
        const newTotal = numberOfShowedRating + 3
        setNumberOfShowedRating(newTotal)
        setReviewList(props.ratings.slice(0, newTotal))
    }
    useEffect(() => {
        if (!reviewList) {
            return
        }
        if (props.ratings.length !== 0) {
            setReviewList(props.ratings.slice(0, numberOfShowedRating))
        }
    }, [props.ratings])
    return (
        <div>
            {props.ratings.length > 0 &&
                props.ratings.map((item, index) => {
                    return (
                        <div className="space-y-6" key={index}>
                            <ReviewItem data={item} isLearn={props.isLearn} />
                            {index !== reviewList.length - 1 && <Divider />}
                        </div>
                    )
                })}
            <Button
                className="btn-primary-outline w-full mt-5"
                onClick={() => updateReviewList()}
            >
                <div className="font-medium text-[16px] text-center w-full">
                    Show more reviews
                </div>
            </Button>
        </div>
    )
}
