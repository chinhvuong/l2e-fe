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
    const { data, isLoading } = useCourseDetailContext()

    return (
        <>
            <LoadingScreen isLoading={isLoading || !data} />
            <CourseLabel />
            <NavBar />
            <CourseInfo />
            <div className="flex justify-center">
                <div className="2xl:w-[1250px]">
                    <div className="2xl:w-[820px] xl:w-[800px] lg:w-[640px] mx-8 sm:mx-4 space-y-7 mt-10">
                        {data ? (
                            <>
                                <Curriculum />
                                <Instructor />
                                <Review />
                                {/* <Recommend /> */}
                            </>
                        ) : (
                            <>
                                <div className="animate-pulse flex w-full py-10">
                                    <div className="flex-1 space-y-6">
                                        <div className="h-2 bg-slate-700 rounded w-full"></div>
                                        <div className="h-2 bg-slate-700 rounded w-2/3"></div>
                                        <div className="h-2 bg-slate-700 rounded w-1/2"></div>
                                        <div className="h-2 bg-slate-700 rounded w-1/3"></div>
                                        <div className="h-2 bg-slate-700 rounded w-1/6"></div>
                                        <div className="h-2 bg-slate-700 rounded w-2/3"></div>
                                        <div className="h-2 bg-slate-700 rounded w-1/2"></div>
                                        <div className="h-2 bg-slate-700 rounded w-2/3"></div>
                                        <div className="h-2 bg-slate-700 rounded w-1/4"></div>
                                        <div className="h-2 bg-slate-700 rounded w-1/2"></div>
                                        <div className="h-2 bg-slate-700 rounded w-1/4"></div>
                                        <div className="h-2 bg-slate-700 rounded w-1/6"></div>
                                        <div className="h-2 bg-slate-700 rounded w-1/3"></div>
                                        <div className="h-2 bg-slate-700 rounded w-1/2"></div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
