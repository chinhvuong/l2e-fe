import UserProfileDetail from '@/components/common/user-profile-detail'
import { User } from '@/store/user/types'
export interface StaticUserProps {
    user: User
}
export default function UserDetailPreviewContainer(data: StaticUserProps) {
    return (
        <>
            <div className="h-full pt-5 px-14">
                <div className="mx-60 under_2xl:mx-20">
                    {data.user && (
                        <UserProfileDetail
                            data={data.user}
                            showShortDescription
                        />
                    )}
                </div>
            </div>
        </>
    )
}
