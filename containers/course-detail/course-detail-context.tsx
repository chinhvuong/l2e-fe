import { LearnerAPI } from '@/api/api-path'
import { CourseDetailPreview } from '@/api/dto/course.dto'
import useAPI from '@/api/hooks/useAPI'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { updateEnrollStatus } from '@/store/course'
import { UpdateOverviewRatingState, UpdateRatingsState } from '@/store/rating'
import {
    getOverViewRatings,
    getRatings,
    getTotalRatings,
} from '@/store/rating/selectors'
import { Rating, RatingOverView } from '@/store/rating/types'
import { updateGlobalLoadingState } from '@/store/user'
import { getLoginState } from '@/store/user/selectors'
import { User } from '@/store/user/types'
import { UseMutateFunction } from '@tanstack/react-query'
import { noop } from 'lodash'
import { useRouter } from 'next/router'
import {
    Dispatch,
    SetStateAction,
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react'

interface ICourseDetailContext {
    data: CourseDetailPreview | undefined
    instructor: User
    ratings: Rating[]
    getRatingCourseDetail: UseMutateFunction<unknown, any, object, unknown>
    searchTerm: string
    setSearchTerm: Dispatch<SetStateAction<string>>
    overviewRating: RatingOverView
    totalRating: number
    courseId: string
    setCurrentTab: Dispatch<SetStateAction<ViewCourseDetailTab>>
    currentTab: ViewCourseDetailTab
    isShowVideoModal: boolean
    setIsShowVideoModal: Dispatch<SetStateAction<boolean>>
}

export type ViewCourseDetailTab =
    | 'Overview'
    | 'Curriculum'
    | 'Instructor'
    | 'Reviews'
export enum ViewCourseDetailTabTitle {
    OVERVIEW = 'Overview',
    CURRICULUM = 'Curriculum',
    INSTRUCTOR = 'Instructor',
    REVIEWS = 'Reviews',
}

export const CourseDetailContext = createContext<ICourseDetailContext>(
    {} as ICourseDetailContext,
)

export const CourseDetailProvider: React.FC<React.PropsWithChildren<{}>> = ({
    children,
}) => {
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [courseId, setCourseId] = useState('')
    const dispatch = useAppDispatch()
    const [data, setData] = useState<CourseDetailPreview>()
    const [instructor, setInstructor] = useState({} as User)
    const router = useRouter()
    const ratings = useAppSelector(getRatings)
    const overviewRating = useAppSelector(getOverViewRatings)
    const totalRating = useAppSelector(getTotalRatings)
    const [currentTab, setCurrentTab] = useState<ViewCourseDetailTab>(
        ViewCourseDetailTabTitle.OVERVIEW,
    )
    const [isShowVideoModal, setIsShowVideoModal] = useState(false)
    const loginState = useAppSelector(getLoginState)

    const { mutate: getCourseDetail, isLoading: isLoadingCourseDetail } =
        useAPI.getMutation(
            LearnerAPI.GET_COURSE_DETAIL + courseId + '?id=' + courseId,
            {
                onError: noop,
                onSuccess: (response: CourseDetailPreview) => {
                    setData(response)
                    setInstructor(response.author)
                },
            },
        )
    const {
        mutate: getRatingCourseDetail,
        isLoading: isLoadingRatingCourseDetail,
    } = useAPI.getMutation(
        LearnerAPI.RATING + '?course=' + courseId + '&query=' + searchTerm,
        {
            onError: noop,
            onSuccess: (response) => {
                dispatch(UpdateRatingsState(response.data))
            },
        },
    )

    const {
        mutate: getRatingOverViewCourseDetail,
        isLoading: isLoadingRatingOverViewCourseDetail,
    } = useAPI.getMutation(LearnerAPI.GET_OVERVIEW_RATING + '?id=' + courseId, {
        onError: noop,
        onSuccess: (response) => {
            dispatch(UpdateOverviewRatingState(response))
        },
    })

    const { mutate: checkEnrollState, isLoading: isLoadingCheckEnrollState } =
        useAPI.getMutation(LearnerAPI.CHECK_ENROLL + data?._id ?? '', {
            onError: noop,
            onSuccess(response) {
                dispatch(updateEnrollStatus(response.enroll))
            },
        })

    useEffect(() => {
        if (data && data._id && loginState) {
            checkEnrollState({})
        }
    }, [loginState, data])

    useEffect(() => {
        if (typeof router.query.slug === 'string') {
            setCourseId(router.query.slug)
            setTimeout(getCourseDetail, 1000)
            setTimeout(getRatingCourseDetail, 1000)
            setTimeout(getRatingOverViewCourseDetail, 1000)
        }
    }, [router.query.slug])

    useEffect(() => {
        dispatch(
            updateGlobalLoadingState(
                isLoadingCourseDetail ||
                    isLoadingRatingCourseDetail ||
                    isLoadingRatingOverViewCourseDetail ||
                    isLoadingCheckEnrollState,
            ),
        )
    }, [
        isLoadingCourseDetail,
        isLoadingRatingCourseDetail,
        isLoadingRatingOverViewCourseDetail,
        isLoadingCheckEnrollState,
    ])

    return (
        <CourseDetailContext.Provider
            value={{
                data,
                instructor,
                ratings,
                getRatingCourseDetail,
                searchTerm,
                setSearchTerm,
                overviewRating,
                totalRating,
                courseId,
                currentTab,
                setCurrentTab,
                isShowVideoModal,
                setIsShowVideoModal,
            }}
        >
            {children}
        </CourseDetailContext.Provider>
    )
}

export const useCourseDetailContext = () => {
    return useContext(CourseDetailContext) as ICourseDetailContext
}
