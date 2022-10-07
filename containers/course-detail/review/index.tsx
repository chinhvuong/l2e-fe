import * as React from 'react'
import ReviewDetail from './reviews'
import StudentFeedback from './student-feedback'

export interface IReviewProps {}

export default function Review() {
    return (
        <div className="flex justify-center">
            <div className="2xl:w-[1250px]">
                <div className="w-[820px] ml-[10px] space-y-5 mt-5">
                    <StudentFeedback />
                    <ReviewDetail />
                </div>
            </div>
        </div>
    )
}
