import LoadingScreen from '@/components/core/animate/loading-screen'
import { useState } from 'react'
import CertificationsList from './components/certifications'
import NavBarProfile from './components/nav-bar'
import UserInfoDetail from './components/user-info'
import { useUpdateProfileContext } from './update-profile-context'

const ProfileContainer = () => {
    const { isLoading } = useUpdateProfileContext()
    const [currentTab, setCurrentTab] = useState('Certifications')
    const getTabContent = () => {
        switch (currentTab) {
            case 'Certifications':
                return <CertificationsList />
            default:
                return <></>
        }
    }

    return (
        <div className="flex">
            <LoadingScreen isLoading={isLoading} />
            <div className="w-3/5 border-r p-2">
                <UserInfoDetail />
            </div>
            <div className="w-2/5 border-r">
                <NavBarProfile setCurrentTab={setCurrentTab} />
                <div className="px-12 mt-8">{getTabContent()}</div>
            </div>
        </div>
    )
}

export default ProfileContainer
