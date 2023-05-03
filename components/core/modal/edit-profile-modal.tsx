import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import VideoPreview from '../video-preview'
import { User } from '@/store/user/types'
import { useUpdateProfileContext } from '@/containers/profile/update-profile-context'
import Input from '../input'
import {
    updateUserAvatarState,
    updateUserBioState,
    updateUserNameState,
    updateUserTitleState,
} from '@/store/user'
import UploadPreview from '../upload-preview'
import Hyperlink from '@/containers/create-course/components/hyperlink'
import Button from '../button'
import { useAppDispatch } from '@/hooks'
import RichTextEditor from '../rich-text-editor'

interface IProfileModalProps {
    isShow: boolean
    setIsShow: React.Dispatch<React.SetStateAction<boolean>>
    userInfo: User
}

export default function EditProfileModal(props: IProfileModalProps) {
    const { updateProfile } = useUpdateProfileContext()
    const { isShow, setIsShow } = props
    const dispatch = useAppDispatch()
    const [showModal, setShowModal] = useState(isShow)
    const [userProfile, setUserProfile] = useState<User>({} as User)
    useEffect(() => {
        setShowModal(isShow)
        if (props.userInfo._id !== undefined) {
            setUserProfile(props.userInfo)
        }
    }, [isShow, props.userInfo])
    const updateUserProfile = () => {
        updateProfile({
            name: userProfile.name,
            avatar: userProfile.avatar,
            title: userProfile.title,
            bio: userProfile.bio,
        })
        setShowModal(false)
        setIsShow(false)
    }

    const handleNameChange = (value: string) => {
        const newUserInfo = { ...userProfile }
        newUserInfo.name = value
        setUserProfile(newUserInfo)
    }

    const handleAvatarChange = (value: string) => {
        const newUserInfo = { ...userProfile }
        newUserInfo.avatar = value
        setUserProfile(newUserInfo)
    }

    const handleTitleChange = (value: string) => {
        const newUserInfo = { ...userProfile }
        newUserInfo.title = value
        setUserProfile(newUserInfo)
    }

    const handleUserBioChange = (value: string) => {
        const newUserInfo = { ...userProfile }
        newUserInfo.bio = value
        setUserProfile(newUserInfo)
    }

    const handleShowModal = (value: boolean) => {
        setShowModal(value)
        setIsShow(value)
    }

    return (
        <>
            {showModal ? (
                <>
                    <div
                        className="w-full h-full flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                        tabIndex={-1}
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-2xl">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="flex items-center justify-between p-5">
                                    <div className="item-center py-5 px-7">
                                        <div className="py-5 space-y-5">
                                            <Input
                                                id="your-name"
                                                label="Name"
                                                placeholder="Insert your new name"
                                                defaultValue={userProfile.name}
                                                updateInput={handleNameChange}
                                            />
                                            <div className="flex">
                                                <div className="h-1/4">
                                                    <UploadPreview
                                                        label="Avatar"
                                                        type="image"
                                                        defaultPreview={
                                                            userProfile.avatar
                                                        }
                                                        setFileLink={
                                                            handleAvatarChange
                                                        }
                                                    >
                                                        <div>
                                                            <span>
                                                                {`Upload your avatar image here. It must meet our `}
                                                            </span>
                                                            <Hyperlink>
                                                                Avatar image
                                                                quality
                                                                standards
                                                            </Hyperlink>
                                                            <span>{` to
                        be accepted. Important guidelines: 200x200 pixels; .jpg,
                        .jpeg,. gif, or .png. no text on the image.`}</span>
                                                        </div>
                                                    </UploadPreview>
                                                </div>
                                            </div>
                                            <Input
                                                id="your-title"
                                                label="Title"
                                                placeholder="Insert your new title"
                                                defaultValue={userProfile.title}
                                                updateInput={handleTitleChange}
                                            />
                                            <RichTextEditor
                                                label="Bio"
                                                defaultValue={userProfile.bio}
                                                updateState={
                                                    handleUserBioChange
                                                }
                                            />
                                        </div>
                                        <div className="flex justify-end space-x-5 mt-4">
                                            <Button
                                                outline
                                                onClick={() =>
                                                    handleShowModal(false)
                                                }
                                            >
                                                <div className="font-medium">
                                                    Cancel
                                                </div>
                                            </Button>
                                            <Button
                                                onClick={() =>
                                                    updateUserProfile()
                                                }
                                            >
                                                <div className="font-medium">
                                                    Save
                                                </div>
                                            </Button>
                                        </div>
                                    </div>
                                    <div
                                        className="absolute top-5 right-5 cursor-pointer"
                                        onClick={() => handleShowModal(false)}
                                    >
                                        ✕
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-700 bg-opacity-50 fixed inset-0 z-40"></div>
                </>
            ) : null}
        </>
    )
}
