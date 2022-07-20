import React, { ReactChild } from 'react'
import Footer from './footer/second-footer'
import Header from './header'

const Layout = ({ children }: { children: ReactChild }) => {
    return (
        <div>
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    )
}

export default Layout
