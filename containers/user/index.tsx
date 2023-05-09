import UserProfileDetail from '@/components/common/user-profile-detail'
import useHideFirstEnterLoadingScreen from '@/hooks/useHideFirstEnterLoadingScreen'
import { User } from '@/store/user/types'
export interface StaticUserProps {
    user: User
}
export default function UserDetailPreviewContainer(props: StaticUserProps) {
    return (
        <>
            <div className="h-full pt-5 px-14">
                <div className="mx-60 under_2xl:mx-20">
                    {props.user && (
                        <UserProfileDetail
                            data={props.user}
                            showShortDescription
                        />
                    )}
                    {/* <EditProfileModal
                        isShow={isShowProfileModal}
                        setIsShow={setIsShowProfileModal}
                        userInfo={user}
                    /> */}
                </div>
            </div>
        </>
    )
}
