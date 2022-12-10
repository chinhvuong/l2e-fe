import Button from '@/components/core/button'
import { useAppDispatch, useAppSelector } from '@/hooks'
import Footer from '@/layout/components/footer'
import { updateSaveCourseState } from '@/store/course'
import { getSaveCourseState } from '@/store/course/selectors'
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
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (isSaved) {
            toast.success('Cập nhật khóa học thành công!', {
                position: 'top-center',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                progress: undefined,
                theme: 'light',
            })
            dispatch(updateSaveCourseState(false))
        }
    }, [isSaved])

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
