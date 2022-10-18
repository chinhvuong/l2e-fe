import { useRouter } from 'next/router'
import React, { ReactChild } from 'react'
import Footer from './components/footer'
import Header from './main-layout/header'
const Layout = ({ children }: { children: ReactChild }) => {
    const router = useRouter()

    const darkTheme =
        router.pathname === '/about-us' || router.pathname === '/'
            ? true
            : false
    return (
        <div>
            <Header darkTheme={darkTheme} isLoggedIn={false} />
            <main id="main">
                <div
                    className="w-full app-transition main-transition h-full bg-white"
                    id="content"
                >
                    {children}
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default Layout
