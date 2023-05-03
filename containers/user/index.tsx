import UserProfileDetail from '@/components/common/user-profile-detail'
import LoadingScreen from '@/components/core/animate/loading-screen'
import EditProfileModal from '@/components/core/modal/edit-profile-modal'
import useHideFirstEnterLoadingScreen from '@/hooks/useHideFirstEnterLoadingScreen'
import { useState } from 'react'

export default function UserDetailPreviewContainer() {
    const userInfo = {
        _id: '6444a59e17e96be03fe27e3e',
        __v: 0,
        avatar: 'https://l2e-store.s3.amazonaws.com/file-1683092294805.jpg',
        bio: '<p>I&#x27;m Angela, I&#x27;m a developer with a passion for teaching. I&#x27;m the <strong>lead instructor</strong> at the London App Brewery, London&#x27;s leading <strong>Programming Bootcamp</strong>. I&#x27;ve helped hundreds of thousands of students learn to code and change their lives by becoming a developer. I&#x27;ve been invited by companies such as Twitter, Facebook and Google to teach their employees.</p><p>My first foray into programming was when I was just 12 years old, wanting to build my own Space Invader game. Since then, I&#x27;ve made <strong>hundred of websites, apps and games</strong>. But most importantly, I realised that my <strong>greatest passion</strong> is teaching.</p><p>I spend most of my time researching how to make <strong>learning to code fun</strong> and make <strong>hard concepts easy to understand</strong>. I apply everything I discover into my bootcamp courses. In my courses, you&#x27;ll find lots of geeky humour but also lots of <strong>explanations and animations</strong> to make sure everything is easy to understand.</p><p><strong>I&#x27;ll be there for you every step of the way.</strong> </p>',
        createdAt: '2023-04-23T03:27:26.026Z',
        name: 'Hữu An',
        nonce: 2,
        rating: 0,
        title: 'Front-end Developer',
        updatedAt: '2023-05-03T12:40:35.201Z',
        walletAddress: '0x4BCD25Ac40C446D28318c225b613AF963C4BC3f8',
        isAdmin: true,
    }
    const isLoading = false

    const [isShowProfileModal, setIsShowProfileModal] = useState(false)

    useHideFirstEnterLoadingScreen()

    return (
        <>
            <LoadingScreen isLoading={isLoading} />
            <div className="h-full pt-5 px-14">
                <div className="mx-60 under_2xl:mx-20">
                    <UserProfileDetail data={userInfo} showShortDescription />
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
