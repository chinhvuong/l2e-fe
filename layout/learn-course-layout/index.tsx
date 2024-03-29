import LoadingScreen from '@/components/core/animate/loading-screen'
import { LearningCourseProvider } from '@/containers/learn-course/learning-course-context'
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
        <LearningCourseProvider>
            <div className="relative">
                <Header />
                <ToastContainer style={{ width: 'max-content' }} />
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
        </LearningCourseProvider>
    )
}
