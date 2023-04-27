import { useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faMagnifyingGlass,
    faChevronDown,
    faStar,
} from '@fortawesome/free-solid-svg-icons'
import useOutsideClick from '@/hooks/useOutSideClick'
import { dataRatings } from '@/data/ratings'
import ReviewItemsList from '@/containers/course-detail/review/components/review-items-list'
import RatingAnalysisBar from '@/containers/course-detail/review/components/rating-analysis-bar'
import RatingStar from '@/components/core/rating-star'
import RatingBar from '@/components/core/rating-star/rating-bar'

export interface ILearningReviewDetailProps {}

export default function LearningReviewDetail() {
    const [selectedRating, setSelectedRating] = useState('All')
    const [openRatingSelect, setOpenRatingSelect] = useState(false)
    const [ratingCount, setRatingCount] = useState(0)
    const clickOutSideRef = useRef(null)
    const ratingsValue = ['All', '5', '4', '3', '2', '1']
    const onSelectRating = (item: string) => {
        setSelectedRating(item)
        setOpenRatingSelect(false)
    }

    useOutsideClick(clickOutSideRef, () => {
        setOpenRatingSelect(false)
    })
    return (
        <div className="space-y-10">
            <RatingBar />
            <div>
                <div className="font-semibold text-2xl">Student feedback</div>
                <div className="flex justify-center space-x-7 under_lg:flex-wrap under_lg:justify-center mt-3">
                    <div className="flex flex-col items-center sm:hidden">
                        <div className="text-primary text-[70px] font-bold leading-[95px]">
                            4.7
                        </div>
                        <div className="sm:hidden">
                            <RatingStar id="4.7" ratingScore={4.7} hideScore />
                        </div>
                        <div className="text-primary font-bold mt-1">
                            Course rating
                        </div>
                    </div>
                    <div className="space-y-2 sm:ml-0 ml-5">
                        <div className="items-center hidden sm:flex">
                            <div className="text-primary font-bold text-[45px] leading-[65px] mr-2">
                                4.7
                            </div>
                            <div className="text-primary font-bold mt-1 text-[25px] mt-4">
                                Course rating
                            </div>
                        </div>
                        <RatingAnalysisBar percent={71} star={5} />
                        <RatingAnalysisBar percent={23} star={4} />
                        <RatingAnalysisBar percent={4} star={3} />
                        <RatingAnalysisBar percent={1} star={2} />
                        <RatingAnalysisBar percent={1} star={1} />
                    </div>
                </div>
            </div>
            <div>
                <div className="font-semibold text-2xl">Reviews</div>
                <div className="flex items-center justify-center under_lg:justify-center">
                    <div className="flex items-center space-x-4 mr-4">
                        <div className="w-[500px] lg:w-[320px] md:w-[280px] sm:w-full py-[10px] rounded-[80px] px-[20px] border-[1px] border-black">
                            <input
                                className="w-full mr-[20px] outline-none"
                                placeholder="Search..."
                            ></input>
                        </div>
                        <FontAwesomeIcon
                            icon={faMagnifyingGlass}
                            className="bg-primary p-4 rounded-full text-white"
                        />
                    </div>
                    <div className="mb-8">
                        <div className="font-bold pb-2 pl-3 sm:text-xs sm:mt-2">
                            Filter ratings
                        </div>
                        <div
                            onClick={() =>
                                setOpenRatingSelect(!openRatingSelect)
                            }
                            ref={clickOutSideRef}
                        >
                            <div className="flex items-center justify-between w-[150px] sm:w-[100px] py-[10px] rounded-[80px] border-[1px] border-black px-[20px] cursor-pointer hover:bg-border-box">
                                <div className="flex items-center space-x-2">
                                    <div>{selectedRating}</div>
                                    <FontAwesomeIcon
                                        icon={faStar}
                                        className={`text-star sm:text-xs pb-1 ${
                                            selectedRating === 'All' && 'hidden'
                                        }`}
                                    />
                                </div>
                                <FontAwesomeIcon
                                    icon={faChevronDown}
                                    className="text-[12px]"
                                />
                            </div>
                            <div
                                className={`w-[150px] sm:w-[100px] py-[5px] rounded-[20px] border-[1px] border-black absolute z-20 mt-1 bg-white drop-shadow-lg ${
                                    !openRatingSelect && 'hidden'
                                }`}
                            >
                                {ratingsValue.map((item) => {
                                    return (
                                        <div
                                            className="hover:bg-primary hover:text-white box-border pl-[20px] py-1.5 rounded-[12px] cursor-pointer"
                                            key={item}
                                            onClick={() => onSelectRating(item)}
                                        >
                                            <div className="flex items-center space-x-2">
                                                <span>{item}</span>
                                                <FontAwesomeIcon
                                                    icon={faStar}
                                                    className={`text-star sm:text-xs pb-1 ${
                                                        item === 'All' &&
                                                        'hidden'
                                                    }`}
                                                />
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <ReviewItemsList data={dataRatings} />
            </div>
        </div>
    )
}
