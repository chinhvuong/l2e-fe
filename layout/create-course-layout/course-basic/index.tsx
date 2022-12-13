import Loading from '@/components/core/animate/loading'
import { useAppSelector } from '@/hooks'
import { getCreatingCourseState } from '@/store/course/selectors'
import { ReactChild } from 'react'

export interface ICourseBasicCreateLayoutProps {}

export default function CourseBasicCreateLayout({
    children,
}: {
    children: ReactChild
}) {
    const isLoading = useAppSelector(getCreatingCourseState)

    return (
        <div>
            <main id="main">
                <div
                    className="flex justify-center w-full app-transition main-transition min-h-screen bg-white"
                    id="content"
                >
                    <div className="flex justify-center w-full">
                        {isLoading && (
                            <div className="bg-slate-400 bg-opacity-40 flex justify-center items-center absolute z-10 w-full h-full">
                                <div className="flex justify-center w-full">
                                    <Loading />
                                </div>
                            </div>
                        )}
                        <div className="w-full">{children}</div>
                    </div>
                </div>
            </main>
        </div>
    )
}
