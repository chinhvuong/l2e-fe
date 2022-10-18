import Footer from '@/layout/components/footer'
import React, { ReactChild } from 'react'
import Header from './header'
import Sidebar from './sidebar'

export default function CreateCourseLayout({
    children,
}: {
    children: ReactChild
}) {
    return (
        <div>
            <Header />
            <main id="main">
                <div
                    className="flex justify-center w-full app-transition main-transition h-full bg-white"
                    id="content"
                >
                    <div className="flex pt-[120px] w-[1200px] space-x-7">
                        <Sidebar />
                        <div className="w-full h-full bg-white border shadow-xl">
                            {children}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
