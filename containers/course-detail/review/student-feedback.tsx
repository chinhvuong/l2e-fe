import RatingStar from '@/components/core/rating-star'
import * as React from 'react'
import { useCourseDetailContext } from '../course-detail-context'
import RatingAnalysisBar from './components/rating-analysis-bar'

export interface IStudentFeedbackProps {}

export default function StudentFeedback() {
    const { data, overviewRating, totalRating } = useCourseDetailContext()
    const getRatingPercents = (ratingcount: number) => {
        if (totalRating === 0) {
            return 0
        } else {
            return Math.round((ratingcount / totalRating) * 100)
        }
    }
    return (
        <>
            {data && (
                <div>
                    <div className="font-semibold text-[26px]">
                        Student feedback
                    </div>
                    <div className="flex justify-between under_lg:flex-wrap under_lg:justify-center mt-3">
                        <div className="flex flex-col items-center sm:hidden">
                            <div className="text-primary text-[70px] font-bold leading-[95px]">
                                {overviewRating.overview}
                            </div>
                            <div className="sm:hidden">
                                <RatingStar
                                    id={overviewRating.overview.toString()}
                                    ratingScore={overviewRating.overview}
                                    hideScore
                                />
                            </div>
                            <div className="text-primary font-bold mt-1">
                                Course rating
                            </div>
                        </div>
                        <div className="space-y-2 sm:ml-0 ml-5">
                            <div className="items-center hidden sm:flex">
                                <div className="text-primary font-bold text-[45px] leading-[65px] mr-2">
                                    {overviewRating.overview}
                                </div>
                                <div className="text-primary font-bold mt-1 text-[25px] mt-4">
                                    Course rating
                                </div>
                            </div>
                            <RatingAnalysisBar
                                percent={getRatingPercents(overviewRating.five)}
                                star={5}
                            />
                            <RatingAnalysisBar
                                percent={getRatingPercents(overviewRating.four)}
                                star={4}
                            />
                            <RatingAnalysisBar
                                percent={getRatingPercents(
                                    overviewRating.three,
                                )}
                                star={3}
                            />
                            <RatingAnalysisBar
                                percent={getRatingPercents(overviewRating.two)}
                                star={2}
                            />
                            <RatingAnalysisBar
                                percent={getRatingPercents(overviewRating.one)}
                                star={1}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
