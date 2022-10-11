import * as React from 'react'
import ReviewDetail from './reviews'
import StudentFeedback from './student-feedback'

export interface IReviewProps {}

export default function Review() {
    return (
        <div className="space-y-7">
            <StudentFeedback />
            <ReviewDetail />
        </div>
    )
}
