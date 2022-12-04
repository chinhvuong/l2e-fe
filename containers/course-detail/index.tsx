import { useCourse } from '@/api/hooks/useCourse'
import Loading from '@/components/core/animate/loading'
import { useAppDispatch } from '@/hooks'
import { updateCourseDetail, updateGetCourseDetailState } from '@/store/course'
import {
    updateAllRequirements,
    updateAllWhatYouWillLearn,
} from '@/store/course/intended-learners'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import NavBar from './components/nav-bar'
import Curriculum from './curriculum'
import CourseInfo from './info'
import CourseLabel from './info/course-label'
import Instructor from './instructor'
import Recommend from './recommend'
import Review from './review'

export default function CourseDetailContainer() {
    const dispatch = useAppDispatch()
    const router = useRouter()

    const getCourseId = () => {
        if (typeof router.query.slug === 'object') {
            return router.query.slug[0]
        }
        return router.query.slug
    }

    const { useGetCourseDetail } = useCourse()
    const { refetch, isFetching } = useGetCourseDetail(getCourseId(), {
        onError: () => {},
        onSuccess: (response) => {
            dispatch(updateCourseDetail(response))
            response?.goals &&
                dispatch(updateAllWhatYouWillLearn(response.goals))
            response?.requirements &&
                dispatch(updateAllRequirements(response.requirements))
        },
    })

    useEffect(() => {
        if (typeof router.query.slug === 'string') {
            refetch()
        }
    }, [router.query.slug])

    if (isFetching) {
        return (
            <div className="bg-black w-full h-[500px] flex justify-center items-center">
                <div className="flex justify-center items-center h-20">
                    <Loading />
                </div>
            </div>
        )
    }

    return (
        <div>
            <CourseLabel />
            <NavBar />
            <CourseInfo />
            <div className="flex justify-center">
                <div className="2xl:w-[1250px]">
                    <div className="2xl:w-[820px] xl:w-[800px] lg:w-[640px] mx-8 sm:mx-4 space-y-7 mt-10">
                        {/* <Curriculum />
                        <Instructor />
                        <Review />
                        <Recommend /> */}
                    </div>
                </div>
            </div>
        </div>
    )
}
