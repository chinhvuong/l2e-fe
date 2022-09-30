import { useRouter } from 'next/router'
import React, { ReactChild } from 'react'
import Footer from './footer'
import Header from './header'
const Layout = ({ children }: { children: ReactChild }) => {
    const router = useRouter()

    const dardTheme =
        router.pathname === '/about-us' || router.pathname === '/'
            ? true
            : false
    return (
        <div>
            <Header darkTheme={dardTheme} />
            <main className={`sm:relative`} id="main">
                <div className="flex sm:flex-col gap-[30px]">
                    <div
                        className="w-full app-transition main-transition h-full bg-white"
                        id="content"
                    >
                        {children}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default Layout
