import { CreateCourseProvider } from '@/containers/create-course/create-course-context'
import { useAppDispatch, useAppSelector } from '@/hooks'
import Footer from '@/layout/components/footer'
import { updateSaveCourseState } from '@/store/course'
import { getSaveCourseState } from '@/store/course/selectors'
import React, { ReactChild, useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import QuestionsHeader from './questions-detail/header'
import QuestionsSidebar from './questions-detail/sidebar'

export default function CreateQuestionsLayout({
    children,
}: {
    children: ReactChild
}) {
    return (
        <div className="relative">
            <QuestionsHeader />
            <main id="main">
                <div
                    className="flex justify-center w-full app-transition main-transition h-full bg-white"
                    id="content"
                >
                    <div className="flex pt-[120px] w-[1200px] space-x-7">
                        <ToastContainer />
                        <QuestionsSidebar />
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
