import { ReactChild } from 'react'
import Sidebar from './sidebar'

export interface IMyCoursesLayoutProps {}

export default function LearnerLayout({ children }: { children: ReactChild }) {
    return (
        <div className="relative">
            <main id="main">
                <div
                    className="flex justify-center w-full app-transition main-transition min-h-screen bg-white"
                    id="content"
                >
                    <div className="flex justify-center w-full">
                        <Sidebar />
                        <div className="w-full h-full">{children}</div>
                    </div>
                </div>
            </main>
        </div>
    )
}
