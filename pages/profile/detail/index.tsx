import UserInfoDetail from '@/containers/profile/components/user-info'
import ProfileLayout from '@/layout/profile-layout'
import { ReactElement } from 'react'

export default function ProfileDetailPage() {
    return <UserInfoDetail />
}

ProfileDetailPage.getLayout = function getLayout(page: ReactElement) {
    return <ProfileLayout>{page}</ProfileLayout>
}
