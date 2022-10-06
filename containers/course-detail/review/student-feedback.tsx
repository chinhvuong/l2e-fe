import RatingStar from '@/components/core/course-card/rating-star'
import * as React from 'react'
import RatingAnalysisBar from './components/rating-analysis-bar'

export interface IStudentFeedbackProps {}

export default function StudentFeedback() {
    return (
        <div className="w-[820px] ml-[110px] space-y-5 mt-5">
            <div className="font-semibold text-[26px]">Student feedback</div>
            <div className="flex justify-between">
                <div className="flex flex-col items-center">
                    <div className="text-primary text-[70px] font-bold leading-[95px]">
                        4.7
                    </div>
                    <RatingStar id={4.7} ratingScore={4.7} hideScore />
                    <div className="text-primary font-bold mt-1">
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
