import { UserAPI } from '@/api/api-path'
import StaticCertificationsList from '@/containers/user/components/certifications'
import UsersInfoLayout from '@/layout/users-info-layout'
import { Certificate } from '@/store/certification/types'
import axios from 'axios'
import { GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { ReactElement } from 'react'
export interface StaticCertificateProps {
    certificates: Certificate[]
}
export default function ProfileCertificatesPage(data: StaticCertificateProps) {
    return <StaticCertificationsList certificates={data.certificates} />
}
export const getStaticProps: GetStaticProps = async (context) => {
    const slug = (context.params as ParsedUrlQuery).slug
    let certificates = [] as Certificate[]
    try {
        const res = await axios.get(
            process.env.NEXT_PUBLIC_API_BACKEND_URL +
                UserAPI.GET_LIST_CERTIFICATION +
                '?userId=' +
                slug,
            {},
        )
        certificates = res.data.data
    } catch (error) {}
    return {
        props: { certificates },
        // Next.js will attempt to re-generate the page:
        // - When a request comes in
        // - At most once every 10 seconds
        revalidate: 10, // In seconds
    }
}

export async function getStaticPaths() {
    return { paths: [], fallback: true }
}
ProfileCertificatesPage.getLayout = function getLayout(page: ReactElement) {
    return <UsersInfoLayout>{page}</UsersInfoLayout>
}
