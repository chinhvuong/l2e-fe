import LoadingScreen from '@/components/core/animate/loading-screen'
import { useAppSelector } from '@/hooks'
import { getLoadingState } from '@/store/course/selectors'
import { ReactChild } from 'react'
import Sidebar from './sidebar'

export default function InstructorLayout({
    children,
}: {
    children: ReactChild
}) {
    const isLoading = useAppSelector(getLoadingState)

    return (
        <div className="relative">
            <LoadingScreen isLoading={isLoading} />
            <main id="main">
                <div
                    className="flex justify-center w-full app-transition main-transition min-h-screen bg-white"
                    id="content"
                >
                    <div className="flex justify-center w-full">
                        <Sidebar />
                        <div className="w-full h-full">{children}</div>
                    </div>
                </div>
            </main>
        </div>
    )
}
