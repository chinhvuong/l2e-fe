import Hyperlink from '@/containers/create-course/components/hyperlink'
import { useUpdateProfileContext } from '@/containers/profile/update-profile-context'
import { User } from '@/store/user/types'
import { ContentState, EditorState, convertFromHTML } from 'draft-js'
import React, { useEffect, useState } from 'react'
import Button from '../button'
import Input from '../input'
import RichTextEditor from '../rich-text-editor'
import UploadPreview from '../upload-preview'
import './style.scss'
interface IProfileModalProps {
    isShow: boolean
    setIsShow: React.Dispatch<React.SetStateAction<boolean>>
    userInfo: User
}

export default function EditProfileModal(props: IProfileModalProps) {
    const { updateProfile } = useUpdateProfileContext()
    const { isShow, setIsShow } = props
    const [showModal, setShowModal] = useState(isShow)
    const [userProfile, setUserProfile] = useState<User>({} as User)
    const [errorUpdate, setError] = useState<User>({
        bio: '',
        name: '',
        title: '',
        avatar: '',
    } as User)

    useEffect(() => {
        setShowModal(isShow)
        if (props.userInfo._id !== undefined) {
            setUserProfile(props.userInfo)
        }
    }, [isShow, props.userInfo])
    const updateUserProfile = () => {
        if (getValidateResult()) {
            updateProfile({
                name: userProfile.name,
                avatar: userProfile.avatar,
                title: userProfile.title,
                bio: userProfile.bio,
            })
            setShowModal(false)
            setIsShow(false)
        } else {
            validateUserInfo(userProfile)
        }
    }
    const getBioLength = (value: string) => {
        if (value === null || value === undefined || value === '') {
            return 0
        } else {
            return EditorState.createWithContent(
                ContentState.createFromBlockArray(
                    convertFromHTML(value).contentBlocks,
                ),
            )
                .getCurrentContent()
                .getPlainText()
                .split(/(\s+)/)
                .filter((e) => e.trim().length > 0).length
        }
    }
    const validateUserInfo = (value: User) => {
        const errors = { ...errorUpdate }
        if (value.name === '' || value.name === null) {
            errors.name = 'This field is required'
        }
        if (value.title === '' || value.title === null) {
            errors.title = 'This field is required'
        }
        if (value.avatar === '' || value.avatar === null) {
            errors.avatar = 'This field is required'
        }
        if (getBioLength(String(value.bio)) < 100) {
            errors.bio = 'This field requires at least 100 words'
        }
        setError(errors)
    }
    const validateUpdate = (value: string | null, field: string) => {
        switch (field) {
            case 'name':
                if (value === '' || value === null) {
                    const errors = { ...errorUpdate }
                    errors.name = 'This field is required'
                    setError(errors)
                } else {
                    const errors = { ...errorUpdate }
                    errors.name = ''
                    setError(errors)
                }
                break
            case 'title':
                if (value === '' || value === null) {
                    const errors = { ...errorUpdate }
                    errors.title = 'This field is required'
                    setError(errors)
                } else {
                    const errors = { ...errorUpdate }
                    errors.title = ''
                    setError(errors)
                }
                break
            case 'bio':
                if (getBioLength(String(value)) < 100) {
                    const errors = { ...errorUpdate }
                    errors.bio = 'This field requires at least 100 words'
                    setError(errors)
                } else {
                    const errors = { ...errorUpdate }
                    errors.bio = ''
                    setError(errors)
                }
                break
            case 'avatar':
                if (value === null) {
                    const errors = { ...errorUpdate }
                    errors.avatar = 'This field is required'
                    setError(errors)
                } else {
                    const errors = { ...errorUpdate }
                    errors.avatar = ''
                    setError(errors)
                }
                break
        }
    }
    const getValidateResult = () => {
        if (
            userProfile.avatar !== '' &&
            userProfile.name !== '' &&
            userProfile.title !== '' &&
            userProfile.bio !== '' &&
            userProfile.avatar !== null &&
            userProfile.name !== null &&
            userProfile.title !== null &&
            userProfile.bio !== null
        ) {
            return true
        } else {
            return false
        }
    }
    const handleNameChange = (value: string) => {
        const newUserInfo = { ...userProfile }
        newUserInfo.name = value
        setUserProfile(newUserInfo)
        validateUpdate(value, 'name')
    }

    const handleAvatarChange = (value: string) => {
        const newUserInfo = { ...userProfile }
        newUserInfo.avatar = value
        setUserProfile(newUserInfo)
        validateUpdate(value, 'avatar')
    }

    const handleTitleChange = (value: string) => {
        const newUserInfo = { ...userProfile }
        newUserInfo.title = value
        setUserProfile(newUserInfo)
        validateUpdate(value, 'title')
    }

    const handleUserBioChange = (value: string) => {
        const newUserInfo = { ...userProfile }
        newUserInfo.bio = value
        setUserProfile(newUserInfo)
        validateUpdate(value, 'bio')
    }

    const handleShowModal = (value: boolean) => {
        setShowModal(value)
        setIsShow(value)
        if (value === false) {
            setError({
                bio: '',
                name: '',
                title: '',
                avatar: '',
            } as User)
        }
    }

    return (
        <>
            {showModal ? (
                <>
                    <div className="flex justify-center items-center fixed inset-0 z-40 outline-none focus:outline-none">
                        <div className="relative">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="p-10 max-h-[500px] overflow-y-auto scrollbar">
                                    <div className="space-y-5 max-w-3xl">
                                        <div className="pb-5 space-y-5">
                                            <div>
                                                <Input
                                                    id="your-name"
                                                    label="Name"
                                                    placeholder="Insert your new name"
                                                    defaultValue={
                                                        userProfile.name
                                                    }
                                                    updateInput={
                                                        handleNameChange
                                                    }
                                                />
                                                {errorUpdate.name !== '' && (
                                                    <div className="ml-[25px] text-sm mt-1 text-red-500">
                                                        {errorUpdate.name}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex">
                                                <div className="h-1/4">
                                                    <UploadPreview
                                                        label="Avatar"
                                                        type="image"
                                                        defaultPreview={
                                                            userProfile.avatar ??
                                                            ''
                                                        }
                                                        setFileLink={
                                                            handleAvatarChange
                                                        }
                                                        imgClassName="basis-1/4"
                                                        childrenClassName="basis-3/4"
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
                                                    {errorUpdate.avatar !==
                                                        '' && (
                                                        <div className="ml-[25px] text-sm mt-1 text-red-500">
                                                            {errorUpdate.avatar}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div>
                                                <Input
                                                    id="your-title"
                                                    label="Title"
                                                    placeholder="Insert your new title"
                                                    defaultValue={
                                                        userProfile.title
                                                    }
                                                    updateInput={
                                                        handleTitleChange
                                                    }
                                                />
                                                {errorUpdate.title !== '' && (
                                                    <div className="ml-[25px] text-sm mt-1 text-red-500">
                                                        {errorUpdate.title}
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <RichTextEditor
                                                    label="Bio"
                                                    defaultValue={
                                                        userProfile.bio ?? ''
                                                    }
                                                    updateState={
                                                        handleUserBioChange
                                                    }
                                                />
                                                {errorUpdate.bio !== '' && (
                                                    <div className="ml-[25px] text-sm mt-1 text-red-500">
                                                        {errorUpdate.bio}
                                                    </div>
                                                )}
                                            </div>
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
                                        className="absolute top-5 right-5 cursor-pointer bg-gray-300 px-2 rounded-full"
                                        onClick={() => handleShowModal(false)}
                                    >
                                        x
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-700 bg-opacity-50 fixed inset-0 z-30"></div>
                </>
            ) : null}
        </>
    )
}
