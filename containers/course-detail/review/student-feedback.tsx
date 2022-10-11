import RatingStar from '@/components/core/course-card/rating-star'
import * as React from 'react'
import RatingAnalysisBar from './components/rating-analysis-bar'

export interface IStudentFeedbackProps {}

export default function StudentFeedback() {
    return (
        <div>
            <div className="font-semibold text-[26px]">
                ??? Student feedback
            </div>
            <div className="flex justify-between mt-3">
                <div className="flex flex-col items-center">
                    <div className="text-primary text-[70px] sm:text-[50px] font-bold leading-[95px]">
                        4.7
                    </div>
                    <RatingStar id={4.7} ratingScore={4.7} hideScore />
                    <div className="text-primary font-bold mt-1 sm:text-[12px]">
                        Course rating
                    </div>
                </div>
                <div className="space-y-2">
                    <RatingAnalysisBar percent={71} star={5} />
                    <RatingAnalysisBar percent={23} star={4} />
                    <RatingAnalysisBar percent={4} star={3} />
                    <RatingAnalysisBar percent={1} star={2} />
                    <RatingAnalysisBar percent={1} star={1} />
                </div>
            </div>
        </div>
    )
}
