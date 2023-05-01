import Button from '@/components/core/button'
import Divider from '@/components/core/divider'
import { useLearningCourseContext } from '@/containers/learn-course/learning-course-context'
import { useState } from 'react'
import ReviewItem from './review-item'

export interface IReviewItemsListProps {}

export default function ReviewItemsList(props: IReviewItemsListProps) {
    const { ratings, getRatingCourseDetail } = useLearningCourseContext()
    const [reviewList, setReviewList] = useState(ratings)
    const updateReviewList = () => {
        const newList = [...reviewList, ...ratings]
        setReviewList(newList)
    }

    if (!reviewList) {
        return <></>
    }

    return (
        <div>
            {ratings.map((item, index) => {
                return (
                    <div className="space-y-6" key={index}>
                        <ReviewItem
                            data={item}
                            getRatingCourseDetail={getRatingCourseDetail}
                        />
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
