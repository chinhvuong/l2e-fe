import Button from '@/components/core/button'
import {
    FacebookIcon,
    InstagramIcon,
    TwitterIcon,
    YoutubeIcon,
} from '@/components/core/icons'
import EditProfileModal from '@/components/core/modal/edit-profile-modal'
import { faAward, faStar, faUserGroup } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import parse from 'html-react-parser'
import { useState } from 'react'
import { useUpdateProfileContext } from '../update-profile-context'

export default function UserInfoDetail() {
    const { userInfo } = useUpdateProfileContext()
    const [isShowProfileModal, setIsShowProfileModal] = useState(false)

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
                {userInfo ? (
                    <>
                        <div className="my-8">
                            <div className="font-semibold text-2xl mb-1 text-hyperlink cursor-pointer">
                                {userInfo?.name ?? 'Anonymous'}
                            </div>
                            <div className="text-description mt-1">
                                {userInfo?.title ?? ''}
                            </div>
                            <div className="flex space-x-5 py-3">
                                <FacebookIcon
                                    fillColor="#000000"
                                    width="20px"
                                />
                                <TwitterIcon fillColor="#000000" width="20px" />
                                <InstagramIcon
                                    fillColor="#000000"
                                    width="20px"
                                />
                                <YoutubeIcon fillColor="#000000" width="20px" />
                            </div>
                            <div className="flex items-center my-4">
                                {userInfo.avatar ? (
                                    <img
                                        src={`${userInfo?.avatar}`}
                                        alt=""
                                        className="rounded-[50%] w-[120px]"
                                    />
                                ) : (
                                    <img
                                        src="/svgs/default_user_avatar.svg"
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
                                    {userInfo?.bio
                                        ? getUIContent(userInfo?.bio)
                                        : 'No description'}
                                </div>
                            </div>
                            <EditProfileModal
                                isShow={isShowProfileModal}
                                setIsShow={setIsShowProfileModal}
                                userInfo={userInfo}
                            />
                        </div>
                    </>
                ) : (
                    <div className="animate-pulse flex w-full my-8">
                        <div className="flex-1 space-y-6">
                            <div className="h-2 bg-slate-700 rounded w-1/4"></div>
                            <div className="h-2 bg-slate-700 rounded w-1/6"></div>
                            <div className="h-2 bg-slate-700 rounded w-1/6"></div>
                            <div className="flex items-center my-4">
                                <div className="h-2 bg-slate-700 min-w-[120px] min-h-[120px]"></div>
                                <div className="w-full flex flex-col space-y-5 ml-7 mr-4">
                                    <div className="h-2 bg-slate-700 rounded w-1/6"></div>
                                    <div className="h-2 bg-slate-700 rounded w-1/6"></div>
                                    <div className="h-2 bg-slate-700 rounded w-1/6"></div>
                                </div>
                            </div>
                            <div className="h-2 bg-slate-700 rounded w-2/3"></div>
                            <div className="h-2 bg-slate-700 rounded w-1/2"></div>
                            <div className="h-2 bg-slate-700 rounded w-1/3"></div>
                            <div className="h-2 bg-slate-700 rounded w-1/6"></div>
                            <div className="h-2 bg-slate-700 rounded w-2/3"></div>
                            <div className="h-2 bg-slate-700 rounded w-1/2"></div>
                            <div className="h-2 bg-slate-700 rounded w-2/3"></div>
                            <div className="h-2 bg-slate-700 rounded w-1/4"></div>
                            <div className="h-2 bg-slate-700 rounded w-1/2"></div>
                            <div className="h-2 bg-slate-700 rounded w-1/4"></div>
                            <div className="h-2 bg-slate-700 rounded w-1/6"></div>
                            <div className="h-2 bg-slate-700 rounded w-1/3"></div>
                            <div className="h-2 bg-slate-700 rounded w-1/2"></div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}
