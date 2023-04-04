import { useRouter } from 'next/router'
import { ReactChild } from 'react'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.min.css'
import LoadingScreen from '@/components/core/animate/loading-screen'
import { useAppSelector } from '@/hooks'
import { getLoadingState } from '@/store/course/selectors'
import { CreateQuestionBankProvider } from '@/containers/instructor/questionbank/create-quiz-context'
import Footer from '../components/footer'
import Header from '../main-layout/header'
const QuestionBankLayout = ({ children }: { children: ReactChild }) => {
    const router = useRouter()
    const isLoading = useAppSelector(getLoadingState)

    const darkTheme =
        router.pathname === '/about-us' || router.pathname === '/'
            ? true
            : false

    return (
        <CreateQuestionBankProvider>
            <div className="relative">
                <LoadingScreen isLoading={isLoading} />
                <Header darkTheme={darkTheme} />
                <main id="main">
                    <div
                        className="w-full app-transition main-transition h-full bg-white"
                        id="content"
                    >
                        <ToastContainer />
                        {children}
                    </div>
                </main>
                <Footer />
            </div>
        </CreateQuestionBankProvider>
    )
}

export default QuestionBankLayout
