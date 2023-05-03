import RatingStar from '@/components/core/rating-star'
import RatingBar from '@/components/core/rating-star/rating-bar'
import CommentForm from '@/containers/course-detail/comment/components/comment-form'
import RatingAnalysisBar from '@/containers/course-detail/review/components/rating-analysis-bar'
import ReviewItemsList from '@/containers/course-detail/review/components/review-items-list'
import useOutsideClick from '@/hooks/useOutSideClick'
import {
    faChevronDown,
    faMagnifyingGlass,
    faStar,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { useLearningCourseContext } from '../learning-course-context'
import UpdateReviewsModal from '@/components/core/modal/update-success-modal'
import { useAppDispatch } from '@/hooks'
import useAPI from '@/api/hooks/useAPI'
import { LearnerAPI } from '@/api/api-path'
import { UpdateRatingsState } from '@/store/rating'
import LoadingScreen from '@/components/core/animate/loading-screen'

export interface ILearningReviewDetailProps {}

export default function LearningReviewDetail() {
    const {
        overviewRating,
        totalRating,
        courseId,
        createRatingDetail,
        canRating,
        ratings,
        getRatingCourseDetail,
        searchTerm,
        setSearchTerm,
    } = useLearningCourseContext()
    const dispatch = useAppDispatch()
    const [selectedRating, setSelectedRating] = useState('All')
    const [isLoading, setIsLoading] = useState(false)
    const [openRatingSelect, setOpenRatingSelect] = useState(false)
    const [show, isShow] = useState(false)
    const [userAction, setUserAction] = useState('')
    const [ratingCount, setRatingCount] = useState(0)
    const clickOutSideRef = useRef(null)
    const ratingsValue = ['All', '5', '4', '3', '2', '1']
    const onSelectRating = (item: string) => {
        setIsLoading(true)
        setSelectedRating(item)
        setOpenRatingSelect(false)
        if (item === 'All') {
            setTimeout(() => setIsLoading(false), 1000)
            setTimeout(getRatingCourseDetail, 1000)
        } else {
            setTimeout(getFilterRatingCourseDetail, 1000)
        }
    }
    const {
        mutate: getFilterRatingCourseDetail,
        isLoading: isLoadingFilterRatingCourseDetail,
    } = useAPI.getMutation(
        LearnerAPI.RATING +
            '?course=' +
            courseId +
            '&query=' +
            searchTerm +
            '&rating=' +
            parseInt(selectedRating),
        {
            onError: () => {},
            onSuccess: (response) => {
                dispatch(UpdateRatingsState(response.data))
                setIsLoading(false)
            },
        },
    )
    const onSearchRating = () => {
        setIsLoading(true)
        if (selectedRating === 'All') {
            setTimeout(() => setIsLoading(false), 1000)
            setTimeout(getRatingCourseDetail, 1000)
        } else {
            setTimeout(getFilterRatingCourseDetail, 1000)
        }
    }
    useOutsideClick(clickOutSideRef, () => {
        setOpenRatingSelect(false)
    })
    function validateRating(item: string) {
        if (ratingCount === 0 || item.length === 0) {
            return false
        } else {
            return true
        }
    }
    const handleEnterEvent = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            onSearchRating()
        }
    }
    const getRatingPercents = (ratingcount: number) => {
        return Math.round((ratingcount / totalRating) * 100)
    }
    function createRating(content: string) {
        if (validateRating(content)) {
            createRatingDetail({
                course: courseId,
                rating: ratingCount,
                content: content,
            })
            isShow(true)
            setUserAction('Create')
        } else {
            toast.error('You must rating and give reviews !')
        }
    }
    return (
        <div className="space-y-10">
            <LoadingScreen isLoading={isLoading} />
            {canRating && (
                <div>
                    <RatingBar
                        selectedRatingPoint={ratingCount}
                        setRating={setRatingCount}
                    />
                    <CommentForm handleSubmit={createRating} />
                </div>
            )}
            <div>
                <div className="font-semibold text-2xl">Student feedback</div>
                <div className="flex justify-center space-x-7 under_lg:flex-wrap under_lg:justify-center mt-3">
                    <div className="flex flex-col items-center sm:hidden">
                        <div className="text-primary text-[70px] font-bold leading-[95px]">
                            {Number(overviewRating.overview).toFixed(1)}
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
                        <RatingAnalysisBar
                            percent={getRatingPercents(overviewRating.five)}
                            star={5}
                        />
                        <RatingAnalysisBar
                            percent={getRatingPercents(overviewRating.four)}
                            star={4}
                        />
                        <RatingAnalysisBar
                            percent={getRatingPercents(overviewRating.three)}
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
            <div>
                <div className="font-semibold text-2xl">Reviews</div>
                <div className="flex items-center justify-center under_lg:justify-center">
                    <div className="flex items-center space-x-4 mr-4">
                        <div className="w-[500px] lg:w-[320px] md:w-[280px] sm:w-full py-[10px] rounded-[80px] px-[20px] border-[1px] border-black">
                            <input
                                className="w-full mr-[20px] outline-none"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => {
                                    const queryword = e.target.value
                                    setSearchTerm(queryword)
                                }}
                                onKeyDown={handleEnterEvent}
                            ></input>
                        </div>
                        <FontAwesomeIcon
                            icon={faMagnifyingGlass}
                            className="bg-primary p-4 rounded-full text-white"
                            onClick={() => onSearchRating()}
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
                {ratings.length > 0 && (
                    <ReviewItemsList ratings={ratings} isLearn={true} />
                )}
                <UpdateReviewsModal
                    isShow={show}
                    setIsShow={isShow}
                    userRequest={userAction}
                />
            </div>
        </div>
    )
}
