import ProfileContainer from '@/containers/profile'
import ProfileLayout from '@/layout/profile-layout'

import { ReactElement } from 'react'

export default function Profile() {
    return <ProfileContainer />
}

Profile.getLayout = function getLayout(page: ReactElement) {
    return <ProfileLayout>{page}</ProfileLayout>
}
