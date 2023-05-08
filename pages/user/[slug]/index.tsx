import { UserAPI } from '@/api/api-path'
import UserDetailPreviewContainer from '@/containers/user'
import { User } from '@/store/user/types'
import axios from 'axios'
import { GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'

export const getStaticProps: GetStaticProps = async (context) => {
    const slug = (context.params as ParsedUrlQuery).slug
    const res = await axios.get(
        process.env.NEXT_PUBLIC_API_BACKEND_URL + UserAPI.GET_USER + slug,
        {},
    )
    const user = res.data as User
    return {
        props: { user },
        // Next.js will attempt to re-generate the page:
        // - When a request comes in
        // - At most once every 10 seconds
        revalidate: 10, // In seconds
    }
}

export async function getStaticPaths() {
    return { paths: [], fallback: true }
}

export default UserDetailPreviewContainer
