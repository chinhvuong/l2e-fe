import { ReactChild } from 'react'

export interface IMyCoursesLayoutProps {}

export default function MyCoursesLayout({
    children,
}: {
    children: ReactChild
}) {
    return (
        <div>
            <main id="main">
                <div
                    className="flex justify-center w-full app-transition main-transition h-full bg-white"
                    id="content"
                >
                    <div className="flex justify-center w-full">
                        <div className="w-full h-full">{children}</div>
                    </div>
                </div>
            </main>
        </div>
    )
}
