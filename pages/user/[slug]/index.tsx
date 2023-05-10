import { UserAPI } from '@/api/api-path'
import UserDetailPreviewContainer from '@/containers/user'
import { Certificate } from '@/store/certification/types'
import { User } from '@/store/user/types'
import axios from 'axios'
import { GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
export interface StaticUserProps {
    user: User
    certificates: Certificate[]
}

export const getStaticProps: GetStaticProps = async (context) => {
    const slug = (context.params as ParsedUrlQuery).slug
    let user = {} as User
    let certificates = [] as Certificate[]
    try {
        const res = await axios.get(
            process.env.NEXT_PUBLIC_API_BACKEND_URL +
                UserAPI.GET_LIST_CERTIFICATION +
                '?limit=5&page=0&userId=' +
                slug,
            {},
        )
        certificates = res.data.data
    } catch (error) {
        return {
            notFound: true,
        }
    }
    try {
        const res = await axios.get(
            process.env.NEXT_PUBLIC_API_BACKEND_URL + UserAPI.GET_USER + slug,
            {},
        )
        user = res.data
    } catch (error) {
        return {
            notFound: true,
        }
    }
    return {
        props: { user, certificates },
        // Next.js will attempt to re-generate the page:
        // - When a request comes in
        // - At most once every 10 seconds
        revalidate: 10, // In seconds
    }
}

export async function getStaticPaths() {
    const res = await axios.get(
        process.env.NEXT_PUBLIC_API_BACKEND_URL +
            UserAPI.GET_USER +
            '?sort=cratedAt%3A1',
        {},
    )
    const userLists = res.data.data as User[]
    const paths = userLists.map((user) => ({
        params: { slug: user._id },
    }))
    return {
        paths,
        fallback: true,
    }
}

export default function UserDetailPage(data: StaticUserProps) {
    return (
        <UserDetailPreviewContainer
            user={data.user}
            certificates={data.certificates}
        />
    )
}
