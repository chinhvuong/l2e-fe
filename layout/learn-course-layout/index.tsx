import Footer from '@/layout/components/footer'
import { ReactChild } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './header'

export default function LearnCourseLayout({
    children,
}: {
    children: ReactChild
}) {
    return (
        <div className="relative">
            {/* <LoadingScreen isLoading={isLoading} /> */}
            <Header />
            <ToastContainer />
            <main id="main">
                <div
                    className="w-full app-transition main-transition h-full bg-white"
                    id="content"
                >
                    <div className="flex space-x-7">{children}</div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
