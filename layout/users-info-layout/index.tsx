import { ReactChild } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import Sidebar from './sidebar'

const UsersInfoLayout = ({ children }: { children: ReactChild }) => {
    return (
        <div className="relative">
            <main id="main">
                <div
                    className="flex justify-center w-full app-transition main-transition min-h-screen bg-white"
                    id="content"
                >
                    <ToastContainer />
                    <div className="flex justify-center w-full">
                        <Sidebar />
                        <div className="w-full h-full">{children}</div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default UsersInfoLayout
