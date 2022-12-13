import Loading from '@/components/core/animate/loading'
import Button from '@/components/core/button'
import { useAppDispatch, useAppSelector } from '@/hooks'
import Footer from '@/layout/components/footer'
import {
    updateCreatingCourseState,
    updateSaveCourseState,
} from '@/store/course'
import {
    getCreatingCourseState,
    getSaveCourseState,
} from '@/store/course/selectors'
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
    const isLoading = useAppSelector(getCreatingCourseState)
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (isSaved) {
            dispatch(updateSaveCourseState(false))
            toast.success('Cập nhật khóa học thành công!', {
                position: 'top-center',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                progress: undefined,
                theme: 'light',
            })
        }
    }, [isSaved])

    useEffect(() => {
        dispatch(updateCreatingCourseState(false))
    }, [isLoading])

    return (
        <div>
            <Header />
            <main id="main">
                <div
                    className="flex justify-center w-full app-transition main-transition h-full bg-white"
                    id="content"
                >
                    <div className="flex pt-[120px] w-[1200px] space-x-7">
                        <ToastContainer />
                        <Sidebar />
                        {isLoading && (
                            <div className="bg-slate-400 bg-opacity-40 flex justify-center items-center absolute z-10 w-full h-full">
                                <div className="flex justify-center w-full">
                                    <Loading />
                                </div>
                            </div>
                        )}
                        <div className="w-full h-full bg-white border shadow-xl">
                            {children}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
