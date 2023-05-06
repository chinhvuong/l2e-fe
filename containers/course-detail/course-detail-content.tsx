import LoadingScreen from '@/components/core/animate/loading-screen'
import { useEffect, useRef, useState } from 'react'
import NavBar from './components/nav-bar'
import Sidebar from './components/sidebar'
import {
    ViewCourseDetailTab,
    ViewCourseDetailTabTitle,
    useCourseDetailContext,
} from './course-detail-context'
import CourseInfo from './info'
import CourseLabel from './info/course-label'
import Instructor from './instructor'
import Overview from './overview'
import Review from './review'
import Curriculum from './curriculum'

export default function CourseDetailContent() {
    const { data, isLoading, currentTab } = useCourseDetailContext()
    const [scrollY, setScrollY] = useState(0)
    const courseContent = useRef(null)

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY)
        }

        handleScroll()

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const getViewCourseDetailContent = (currentTab: ViewCourseDetailTab) => {
        switch (currentTab) {
            case ViewCourseDetailTabTitle.OVERVIEW:
                return <Overview />
            case ViewCourseDetailTabTitle.CURRICULUM:
                return <Curriculum />
            case ViewCourseDetailTabTitle.INSTRUCTOR:
                return <Instructor />
            case ViewCourseDetailTabTitle.REVIEWS:
                return <Review />
            default:
                return <Overview />
        }
    }

    return (
        <div className="relative">
            <LoadingScreen isLoading={isLoading} />
            <CourseLabel />
            <CourseInfo />
            <NavBar />
            <div className="flex justify-center" ref={courseContent}>
                <div className="flex justify-between 2xl:w-[1250px]">
                    <div className="2xl:w-[820px] xl:w-[800px] lg:w-[640px] 2xl:ml-8 sm:mx-4 space-y-7 mt-10 min-h-[650px]">
                        {data ? (
                            <>{getViewCourseDetailContent(currentTab)}</>
                        ) : (
                            <>
                                <div className="animate-pulse flex w-full">
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
                    <div
                        className={`under_2xl:hidden w-[320px] bg-white z-20 h-fit drop-shadow-xl ${
                            scrollY <= 600 ? 'hidden' : 'sticky top-5'
                        }`}
                    >
                        <Sidebar />
                    </div>
                </div>
            </div>
        </div>
    )
}
