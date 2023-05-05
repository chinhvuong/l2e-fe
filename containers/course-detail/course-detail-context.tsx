import { LearnerAPI } from '@/api/api-path'
import { CourseDetailPreview } from '@/api/dto/course.dto'
import useAPI from '@/api/hooks/useAPI'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { UpdateOverviewRatingState, UpdateRatingsState } from '@/store/rating'
import {
    getOverViewRatings,
    getRatings,
    getTotalRatings,
} from '@/store/rating/selectors'
import { Rating, RatingOverView } from '@/store/rating/types'
import { User } from '@/store/user/types'
import { UseMutateFunction } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import {
    Dispatch,
    SetStateAction,
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react'

interface ICourseDetailContext {
    isLoading: boolean
    data: CourseDetailPreview | undefined
    instructor: User
    ratings: Rating[]
    getRatingCourseDetail: UseMutateFunction<unknown, any, object, unknown>
    searchTerm: string
    setSearchTerm: Dispatch<SetStateAction<string>>
    overviewRating: RatingOverView
    totalRating: number
    courseId: string
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
    const { mutate: getCourseDetail, isLoading: isLoadingCourseDetail } =
        useAPI.getMutation(
            LearnerAPI.GET_COURSE_DETAIL + courseId + '?id=' + courseId,
            {
                onError: () => {},
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
            onError: () => {},
            onSuccess: (response) => {
                dispatch(UpdateRatingsState(response.data))
            },
        },
    )

    const {
        mutate: getRatingOverViewCourseDetail,
        isLoading: isLoadingRatingOverViewCourseDetail,
    } = useAPI.getMutation(LearnerAPI.GET_OVERVIEW_RATING + '?id=' + courseId, {
        onError: () => {},
        onSuccess: (response) => {
            dispatch(UpdateOverviewRatingState(response))
        },
    })
    useEffect(() => {
        if (typeof router.query.slug === 'string') {
            setCourseId(router.query.slug)
            setTimeout(getCourseDetail, 1000)
            setTimeout(getRatingCourseDetail, 1000)
            setTimeout(getRatingOverViewCourseDetail, 1000)
        }
    }, [router.query.slug])

    const isLoading = useMemo(() => {
        return (
            isLoadingCourseDetail ||
            isLoadingRatingCourseDetail ||
            isLoadingRatingOverViewCourseDetail
        )
    }, [
        isLoadingCourseDetail,
        isLoadingRatingCourseDetail,
        isLoadingRatingOverViewCourseDetail,
    ])

    return (
        <CourseDetailContext.Provider
            value={{
                isLoading,
                data,
                instructor,
                ratings,
                getRatingCourseDetail,
                searchTerm,
                setSearchTerm,
                overviewRating,
                totalRating,
                courseId,
            }}
        >
            {children}
        </CourseDetailContext.Provider>
    )
}

export const useCourseDetailContext = () => {
    return useContext(CourseDetailContext) as ICourseDetailContext
}
