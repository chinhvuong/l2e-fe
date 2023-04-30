import LoadingScreen from '@/components/core/animate/loading-screen'
import { CreateCourseProvider } from '@/containers/create-course/create-course-context'
import { useAppDispatch, useAppSelector } from '@/hooks'
import Footer from '@/layout/components/footer'
import { updateSaveCourseState } from '@/store/course'
import { getLoadingState, getSaveCourseState } from '@/store/course/selectors'
import React, { ReactChild, useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './header'
import Sidebar from './sidebar'

export default function CreateCourseLayout({
    children,
}: {
    children: ReactChild
}) {
    const isSaved = useAppSelector(getSaveCourseState)
    const isLoading = useAppSelector(getLoadingState)
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (isSaved) {
            dispatch(updateSaveCourseState(false))
            toast.success('Update course detail successfully!', {
                position: 'top-center',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnFocusLoss: false,
                pauseOnHover: false,
                progress: undefined,
                theme: 'light',
            })
        }
    }, [isSaved])

    return (
        <CreateCourseProvider>
            <div className="relative">
                <LoadingScreen isLoading={isLoading} />
                <Header />
                <main id="main">
                    <div
                        className="flex justify-center w-full app-transition main-transition h-full bg-white"
                        id="content"
                    >
                        <div className="flex pt-[120px] w-[1200px] space-x-7">
                            <ToastContainer />
                            <Sidebar />
                            <div className="w-full h-full bg-white border shadow-xl">
                                {children}
                            </div>
                        </div>
                    </div>
                </main>
                {/* <Footer /> */}
            </div>
        </CreateCourseProvider>
    )
}
