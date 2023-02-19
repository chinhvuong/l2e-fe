import Router from 'next/router'
import { ReactChild } from 'react'

export interface IMyCoursesLayoutProps {}

export default function InstructorLayout({
    children,
}: {
    children: ReactChild
}) {
    const goToHomePage = () => {
        Router.push('/')
    }

    return (
        <div className="relative">
            <main id="main">
                <div
                    className="flex justify-center w-full app-transition main-transition min-h-screen bg-white"
                    id="content"
                >
                    <div className="flex justify-center w-full">
                        <div
                            className="bg-second w-[300px] flex justify-center pt-4"
                            onClick={() => goToHomePage()}
                        >
                            <div className="cursor-pointer">
                                <img src="/svgs/logos/logo_light.svg" alt="" />
                            </div>
                        </div>
                        <div className="w-full h-full">{children}</div>
                    </div>
                </div>
            </main>
        </div>
    )
}
