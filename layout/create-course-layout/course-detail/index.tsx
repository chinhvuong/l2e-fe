import { CreateCourseProvider } from '@/containers/create-course/create-course-context'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { updateSaveCourseState } from '@/store/course'
import { getSaveCourseState } from '@/store/course/selectors'
import { ReactChild, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
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
            dispatch(updateSaveCourseState(false))
            toast.success('Update course detail successfully!', {
                position: 'top-center',
                autoClose: 1000,
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
                <Header />
                <main id="main">
                    <div
                        className="flex justify-center w-full app-transition main-transition h-full bg-white"
                        id="content"
                    >
                        <div className="flex pt-[100px] w-[1200px] under_xl:w-full pr-7 space-x-7">
                            <ToastContainer style={{ width: 'max-content' }} />
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
