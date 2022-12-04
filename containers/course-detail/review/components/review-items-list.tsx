import Button from '@/components/core/button'
import Divider from '@/components/core/divider'
import { Rating } from '@/constants/interfaces'
import { useState } from 'react'
import ReviewItem from './review-item'

export interface IReviewItemsListProps {
    data: Rating[]
}

export default function ReviewItemsList(props: IReviewItemsListProps) {
    const [reviewList, setReviewList] = useState(props.data)

    const updateReviewList = () => {
        const newList = [...reviewList, ...props.data]
        setReviewList(newList)
    }

    return (
        <div>
            {reviewList.map((item, index) => {
                return (
                    <div className="space-y-6" key={index}>
                        <ReviewItem data={item} />
                        {index !== reviewList.length - 1 && <Divider />}
                    </div>
                )
            })}
            <Button
                className="btn-primary-outline w-full mt-5"
                onClick={() => updateReviewList()}
            >
                <div className="font-medium text-[16px]">Show more reviews</div>
            </Button>
        </div>
    )
}
