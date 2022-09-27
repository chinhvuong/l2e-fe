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
                        className="w-full app-transition sm:left-0 sm:top-0 main-transition h-full sm:absolute bg-white"
                        id="content"
                    >
                        {children}
                        <div className="hidden sm:block">
                            <Footer />
                        </div>
                    </div>
                </div>
            </main>
            <div className="md:hidden" id="footer">
                <Footer />
            </div>
        </div>
    )
}

export default Layout
