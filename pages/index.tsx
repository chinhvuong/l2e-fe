import { UserAPI } from '@/api/api-path'
import HomePageContainer from '@/containers/home'
import axios from 'axios'
import { GetStaticProps } from 'next'

export const getStaticProps: GetStaticProps = async (context) => {
    let courseList = []
    try {
        const res = await axios.get(
            String(process.env.NEXT_PUBLIC_API_BACKEND_URL) +
                UserAPI.GET_ALL_COURSES,
            {},
        )
        courseList = res.data.data
        console.log(res.data.data)
    } catch (error) {
        return {
            notFound: true,
        }
    }
    return {
        props: { courseList },
        // Next.js will attempt to re-generate the page:
        // - When a request comes in
        // - At most once every 10 seconds
        revalidate: 10, // In seconds
    }
}

export default HomePageContainer
