import * as React from 'react'
import ReviewDetail from './reviews'
import StudentFeedback from './student-feedback'

export interface IReviewProps {}

export default function Review() {
    return (
        <div>
            <StudentFeedback />
            <ReviewDetail />
        </div>
    )
}
