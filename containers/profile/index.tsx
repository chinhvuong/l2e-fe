import { LearnerAPI, UserAPI } from '@/api/api-path'
import useAPI from '@/api/hooks/useAPI'
import LoadingScreen from '@/components/core/animate/loading-screen'
import PlayQuizModal from '@/components/core/modal/play-quiz-modal'
import { PlayQuizRes } from '@/store/questions/types'
import { noop } from 'lodash'
import { useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import CertificationsList from './components/certifications'
import NavBarProfile from './components/nav-bar'
import UserInfoDetail from './components/user-info'
import { useAppDispatch } from '@/hooks'
import { updateCertifications } from '@/store/certification'
import { updateUserInfo } from '@/store/user'
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
