import { useRouter } from 'next/router'
import { ReactChild } from 'react'
import { ToastContainer } from 'react-toastify'
import Footer from './components/footer'
import Header from './main-layout/header'
import 'react-toastify/dist/ReactToastify.min.css'
import LoadingScreen from '@/components/core/animate/loading-screen'
import { useAppSelector } from '@/hooks'
import { getLoadingState } from '@/store/course/selectors'
const Layout = ({ children }: { children: ReactChild }) => {
    const router = useRouter()
    const isLoading = useAppSelector(getLoadingState)
    const darkTheme =
        router.pathname === '/about-us' || router.pathname === '/'
            ? true
            : false

    return (
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
    )
}

export default Layout
