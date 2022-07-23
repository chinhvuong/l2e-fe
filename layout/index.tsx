import React, { ReactChild } from 'react'
import Footer from './footer'
import Header from './header'

const Layout = ({ children }: { children: ReactChild }) => {
    return (
        <div>
            <Header />
            <main className="limit h-screen">{children}</main>
            <Footer />
        </div>
    )
}

export default Layout
