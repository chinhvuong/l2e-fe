import { UpdateProfileProvider } from '@/containers/profile/update-profile-context'
import { ReactChild } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import Sidebar from './sidebar'

const ProfileLayout = ({ children }: { children: ReactChild }) => {
    return (
        <UpdateProfileProvider>
            <div className="relative">
                <main id="main">
                    <div
                        className="flex justify-center w-full app-transition main-transition min-h-screen bg-white"
                        id="content"
                    >
                        <ToastContainer style={{ width: 'max-content' }} />
                        <div className="flex justify-center w-full">
                            <Sidebar />
                            <div className="w-full h-full">{children}</div>
                        </div>
                    </div>
                </main>
            </div>
        </UpdateProfileProvider>
    )
}

export default ProfileLayout
