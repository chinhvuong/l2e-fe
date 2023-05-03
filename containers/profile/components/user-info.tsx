import UserProfileDetail from '@/components/common/user-profile-detail'
import LoadingScreen from '@/components/core/animate/loading-screen'
import Button from '@/components/core/button'
import EditProfileModal from '@/components/core/modal/edit-profile-modal'
import useHideFirstEnterLoadingScreen from '@/hooks/useHideFirstEnterLoadingScreen'
import { useState } from 'react'
import { useUpdateProfileContext } from '../update-profile-context'

export default function UserInfoDetail() {
    const { userInfo, isLoading } = useUpdateProfileContext()
    const [isShowProfileModal, setIsShowProfileModal] = useState(false)

    useHideFirstEnterLoadingScreen()

    return (
        <>
            <LoadingScreen isLoading={isLoading} />
            <div className="h-full pt-9 px-14">
                <div className="flex justify-between">
                    <div className="font-semibold text-[30px]">Profile</div>
                    <div className="text-white">
                        <Button
                            onClick={() => {
                                setIsShowProfileModal(!isShowProfileModal)
                            }}
                        >
                            Edit Profile
                        </Button>
                    </div>
                </div>
                <div className="mt-10">
                    <UserProfileDetail data={userInfo} />
                    <EditProfileModal
                        isShow={isShowProfileModal}
                        setIsShow={setIsShowProfileModal}
                        userInfo={userInfo}
                    />
                </div>
            </div>
        </>
    )
}
