import { ReactChild } from 'react'

export interface ICourseBasicCreateLayoutProps {}

export default function CourseBasicCreateLayout({
    children,
}: {
    children: ReactChild
}) {
    return (
        <div className="relative">
            <main id="main">
                <div
                    className="flex justify-center w-full app-transition main-transition min-h-screen bg-white"
                    id="content"
                >
                    <div className="flex justify-center w-full">
                        <div className="w-full">{children}</div>
                    </div>
                </div>
            </main>
        </div>
    )
}
