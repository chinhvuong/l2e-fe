import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Router, { useRouter } from 'next/router'
import Button from '@/components/core/button'
import { useCourse } from '@/api/hooks/useCourse'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { getMyCourseDetail } from '@/store/course/selectors'
import {
    updateCourseDetail,
    updateGetCourseDetailState,
    updateSaveCourseState,
} from '@/store/course'
import { useEffect, useState } from 'react'
import {
    updateAllRequirements,
    updateAllWhatYouWillLearn,
} from '@/store/course/intended-learners'

export interface IHeaderProps {}

export default function Header() {
    const dispatch = useAppDispatch()
    const courseDetail = useAppSelector(getMyCourseDetail)
    const router = useRouter()

    const [isLoading, setIsLoading] = useState(false)

    const getCourseId = () => {
        if (typeof router.query.slug === 'object') {
            return router.query.slug[0]
        }
        return router.query.slug
    }

    const { useGetMyCourseDetail, useUpdateCourse } = useCourse()
    const { mutate: updateCourse } = useUpdateCourse({
        onError: () => {},
        onSuccess: (response) => {
            dispatch(updateCourseDetail(response))
            response?.goals &&
                dispatch(updateAllWhatYouWillLearn(response.goals))
            response?.requirements &&
                dispatch(updateAllRequirements(response.requirements))
            setIsLoading(false)
            dispatch(updateSaveCourseState(true))
        },
    })
    const { refetch } = useGetMyCourseDetail(getCourseId(), {
        onError: () => {},
        onSuccess: (response) => {
            dispatch(updateCourseDetail(response))
            response?.goals &&
                dispatch(updateAllWhatYouWillLearn(response.goals))
            response?.requirements &&
                dispatch(updateAllRequirements(response.requirements))
            dispatch(updateGetCourseDetailState(true))
            setIsLoading(false)
        },
    })

    useEffect(() => {
        if (typeof router.query.slug === 'string') {
            refetch()
        }
    }, [router.query.slug])

    const goBack = () => {
        Router.push('/instructor')
    }

    const handleUpdateCourseDetail = () => {
        if (!isLoading) {
            setIsLoading(true)
            updateCourse(courseDetail)
        }
    }

    return (
        <div className="flex items-center justify-between bg-black h-[65px] w-full fixed top-0 z-10 px-5">
            <div
                className="flex items-center space-x-3"
                onClick={() => goBack()}
            >
                <FontAwesomeIcon
                    icon={faChevronLeft}
                    className="text-xl bg-black text-white"
                />
                <div className="text-white">Back</div>
            </div>
            <Button
                isLoading={isLoading}
                onClick={() => handleUpdateCourseDetail()}
            >
                <div className="font-semibold">Save</div>
            </Button>
        </div>
    )
}
