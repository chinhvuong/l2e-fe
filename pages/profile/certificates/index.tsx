import CertificationsList from '@/containers/profile/components/certifications'
import ProfileLayout from '@/layout/profile-layout'
import { ReactElement } from 'react'

export default function ProfileCertificatesPage() {
    return <CertificationsList />
}

ProfileCertificatesPage.getLayout = function getLayout(page: ReactElement) {
    return <ProfileLayout>{page}</ProfileLayout>
}
