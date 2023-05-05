import UserProfileDetail from '@/components/common/user-profile-detail'
import LoadingScreen from '@/components/core/animate/loading-screen'
import Button from '@/components/core/button'
import EditProfileModal from '@/components/core/modal/edit-profile-modal'
import useHideFirstEnterLoadingScreen from '@/hooks/useHideFirstEnterLoadingScreen'
import { useState } from 'react'
import { useUpdateProfileContext } from '../update-profile-context'
import {
    FacebookIcon,
    InstagramIcon,
    TwitterIcon,
    YoutubeIcon,
} from '@/components/core/icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAward, faStar, faUserGroup } from '@fortawesome/free-solid-svg-icons'
import parse from 'html-react-parser'

export default function UserInfoDetail() {
    const { userInfo, isLoading } = useUpdateProfileContext()
    const [isShowProfileModal, setIsShowProfileModal] = useState(false)

    useHideFirstEnterLoadingScreen()

    const getUIContent = (content: string) => {
        let formattedData = content.replace(
            /'<li>'/g,
            '<li class="list-disc list-inside ml-2">',
        )
        formattedData = formattedData.replace(
            /'<ul>'/g,
            '<ul class="space-y-3">',
        )

        return (
            <div className="text-justify space-y-3">{parse(formattedData)}</div>
        )
    }

    return (
        <>
            <LoadingScreen isLoading={isLoading} />
            <div className="h-full pt-9 px-[4.5rem]">
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
                <div className="my-8">
                    <div className="font-semibold text-2xl mb-1 text-hyperlink cursor-pointer">
                        {userInfo?.name}
                    </div>
                    <div className="text-description mt-1">
                        {userInfo?.title}
                    </div>
                    <div className="flex space-x-5 py-3">
                        <FacebookIcon fillColor="#000000" width="20px" />
                        <TwitterIcon fillColor="#000000" width="20px" />
                        <InstagramIcon fillColor="#000000" width="20px" />
                        <YoutubeIcon fillColor="#000000" width="20px" />
                    </div>
                    <div className="flex items-center my-4">
                        {userInfo.avatar !== null && (
                            <img
                                src={`${userInfo?.avatar}`}
                                alt=""
                                className="rounded-[50%] w-[120px]"
                            />
                        )}
                        <div className="flex flex-col space-y-2 ml-7 mr-4">
                            <div className="flex items-center space-x-2">
                                <FontAwesomeIcon icon={faStar} />
                                <div>4.7 Instructor Rating</div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <FontAwesomeIcon
                                    icon={faUserGroup}
                                    className="text-sm"
                                />
                                <div>526,234 Reviews</div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <FontAwesomeIcon
                                    icon={faAward}
                                    className="text-xl mr-0.5"
                                />
                                <div>1,634,289 Students</div>
                            </div>
                        </div>
                    </div>
                    <div
                        id="instructor"
                        className="space-y-3 overflow-hidden relative"
                    >
                        <div className="text-justify space-y-3">
                            {userInfo?.bio && getUIContent(userInfo?.bio)}
                        </div>
                    </div>
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
