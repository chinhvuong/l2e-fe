import React, { ReactChild } from 'react'
import Footer from './footer'
import Header from './header'
import Sidebar from './sidebar'
import Breadcrumb from './breadcumb'
const Layout = ({ children }: { children: ReactChild }) => {
    return (
        <div>
            <Header />
            <main className="limit">
                <Breadcrumb />
                {/* {children} */}
                <div className="flex sm:flex-col gap-[30px]">
                    <div className="w-2/5 sm:w-full">
                        <Sidebar />
                    </div>
                    <div className="w-full">{children}</div>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default Layout
