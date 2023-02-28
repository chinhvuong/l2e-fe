import LoadingScreen from '@/components/core/animate/loading-screen'
import NavBar from './components/nav-bar'
import { useCourseDetailContext } from './course-detail-context'
import Curriculum from './curriculum'
import CourseInfo from './info'
import CourseLabel from './info/course-label'
import Instructor from './instructor'
import Recommend from './recommend'
import Review from './review'

export default function CourseDetailContent() {
    const { isLoading } = useCourseDetailContext()

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
