import Input from '@/components/core/input'
import RichTextEditor from '@/components/core/rich-text-editor'
import UploadPreview from '@/components/core/upload-preview'
import Hyperlink from '@/containers/create-course/components/hyperlink'
import { useAppDispatch, useAppSelector } from '@/hooks'
import {
    updateUserAvatarState,
    updateUserBioLength,
    updateUserBioState,
    updateUserNameState,
    updateUserTitleState,
} from '@/store/user'
import { getGlobalLoadingState, getUserProfile } from '@/store/user/selectors'
import Title from '../components/title'

export interface IProfilePageContainerProps {}

export default function ProfilePageContainer() {
    const userProfile = useAppSelector(getUserProfile)
    const isLoading = useAppSelector(getGlobalLoadingState)
    const dispatch = useAppDispatch()
    const handleNameChange = (value: string) => {
        dispatch(updateUserNameState(value))
    }

    const handleAvatarChange = (value: string) => {
        dispatch(updateUserAvatarState(value))
    }

    const handleTitleChange = (value: string) => {
        dispatch(updateUserTitleState(value))
    }

    const handleUserBioChange = (value: string) => {
        dispatch(updateUserBioState(value))
    }

    const updateUserBioLengthChange = (value: number) => {
        dispatch(updateUserBioLength(value))
    }

    return (
        <div>
            <Title title={'Profile'} />
            {!isLoading && userProfile && (
                <div className="py-10 px-14 space-y-5">
                    <div>
                        <Input
                            id="your-name"
                            label="Name"
                            placeholder="Insert your new name"
                            defaultValue={userProfile.name}
                            updateInput={handleNameChange}
                        />
                    </div>
                    <div className="flex">
                        <div className="h-1/4">
                            <UploadPreview
                                label="Avatar"
                                type="image"
                                defaultPreview={
                                    userProfile.avatar ??
                                    '/svgs/default_user_avatar.svg'
                                }
                                setFileLink={handleAvatarChange}
                                imgClassName="basis-1/5 mr-10"
                                childrenClassName="basis-3/4"
                            >
                                <div>
                                    <span>
                                        {`Upload your avatar image here. It must meet our `}
                                    </span>
                                    <Hyperlink>
                                        Avatar image quality standards
                                    </Hyperlink>
                                    <span>{` to
be accepted. Important guidelines: 200x200 pixels; .jpg,
.jpeg,. gif, or .png. no text on the image.`}</span>
                                </div>
                            </UploadPreview>
                        </div>
                    </div>
                    <div>
                        <Input
                            id="your-title"
                            label="Title"
                            placeholder="Insert your new title"
                            defaultValue={userProfile.title}
                            updateInput={handleTitleChange}
                        />
                    </div>
                    <div>
                        <RichTextEditor
                            label="Bio"
                            defaultValue={userProfile.bio ?? ''}
                            updateState={handleUserBioChange}
                            updateTextLength={updateUserBioLengthChange}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}
