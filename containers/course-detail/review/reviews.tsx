import { LearnerAPI } from '@/api/api-path'
import useAPI from '@/api/hooks/useAPI'
import LoadingScreen from '@/components/core/animate/loading-screen'
import { useAppDispatch } from '@/hooks'
import useOutsideClick from '@/hooks/useOutSideClick'
import { UpdateRatingsState } from '@/store/rating'
import {
    faChevronDown,
    faMagnifyingGlass,
    faStar,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { noop } from 'lodash'
import { useRef, useState } from 'react'
import { useCourseDetailContext } from '../course-detail-context'
import ReviewItemsList from './components/review-items-list'

export interface IReviewDetailProps {}

export default function ReviewDetail() {
    const {
        data,
        ratings,
        getRatingCourseDetail,
        courseId,
        searchTerm,
        setSearchTerm,
    } = useCourseDetailContext()
    const [isLoading, setIsLoading] = useState(false)
    const [selectedRating, setSelectedRating] = useState('All')
    const [openRatingSelect, setOpenRatingSelect] = useState(false)
    const clickOutSideRef = useRef(null)
    const ratingsValue = ['All', '5', '4', '3', '2', '1']
    const dispatch = useAppDispatch()
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
            onError: noop,
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
    const handleEnterEvent = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            onSearchRating()
        }
    }
    return (
        <>
            {data && (
                <div>
                    <LoadingScreen isLoading={isLoading} />
                    <div className="font-semibold text-[26px]">Reviews</div>
                    <div className="flex items-center justify-between under_lg:justify-center">
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
                                                selectedRating === 'All' &&
                                                'hidden'
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
                                                onClick={() =>
                                                    onSelectRating(item)
                                                }
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
                        <ReviewItemsList ratings={ratings} isLearn={false} />
                    )}
                </div>
            )}
        </>
    )
}
