import React, { ReactChild } from 'react'
import Footer from './footer'
import Header from './header'
import Breadcrumb from './breadcumb'
const Layout = ({ children }: { children: ReactChild }) => {
    return (
        <div>
            <Header />
            <main className="limit">
                <Breadcrumb />
                <div>{children}</div>
            </main>
            <Footer />
        </div>
    )
}

export default Layout
