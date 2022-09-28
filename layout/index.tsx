import React, { ReactChild } from 'react'
import Footer from './footer'
import Header from './header'
const Layout = ({ children }: { children: ReactChild }) => {
    return (
        <div>
            <Header />
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
