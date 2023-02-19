import { LearnerAPI } from '@/api/api-path'
import useAPI from '@/api/hooks/useAPI'
import LoadingScreen from '@/components/core/animate/loading-screen'
import { useAppDispatch } from '@/hooks'
import { updateCourseDetail } from '@/store/course'
import {
    updateAllRequirements,
    updateAllWhatYouWillLearn,
} from '@/store/course/intended-learners'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
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
    const [courseId, setCourseId] = useState('')

    const { mutate: getCourseDetail, isLoading } = useAPI.getMutation(
        LearnerAPI.GET_COURSE_DETAIL + courseId + '?id=' + courseId,
        {
            onError: () => {},
            onSuccess: async (response) => {
                dispatch(updateCourseDetail(response))
                response?.goals &&
                    dispatch(updateAllWhatYouWillLearn(response.goals))
                response?.requirements &&
                    dispatch(updateAllRequirements(response.requirements))
            },
        },
    )

    useEffect(() => {
        if (typeof router.query.slug === 'string') {
            setCourseId(router.query.slug)
            setTimeout(getCourseDetail, 1000)
        }
    }, [router.query.slug])

    return (
        <>
            <LoadingScreen isLoading={isLoading} />
            <CourseLabel />
            <NavBar />
            <CourseInfo />
            <div className="flex justify-center">
                <div className="2xl:w-[1250px]">
                    <div className="2xl:w-[820px] xl:w-[800px] lg:w-[640px] mx-8 sm:mx-4 space-y-7 mt-10">
                        <Curriculum />
                        <Instructor />
                        <Review />
                        <Recommend />
                    </div>
                </div>
            </div>
        </>
    )
}
