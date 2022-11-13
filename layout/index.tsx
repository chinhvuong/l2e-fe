import { ACCESS_TOKEN, WALLET_ADDRESS } from '@/constants/localStorage'
import { useRouter } from 'next/router'
import { ReactChild, useEffect, useState } from 'react'
import Footer from './components/footer'
import Header from './main-layout/header'
import {useAccount} from 'wagmi'
const Layout = ({ children }: { children: ReactChild }) => {
    const { address, isConnected } = useAccount();
    const router = useRouter()

    const darkTheme =
        router.pathname === '/about-us' || router.pathname === '/'
            ? true
            : false
    return (
        <div>
            <Header darkTheme={darkTheme}/>
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
