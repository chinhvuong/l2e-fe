import SearchPageContainer from '@/containers/search'
import Layout from '@/layout'
import type { ReactElement } from 'react'

export interface ISearchCourseProps {}

export default function SearchCourse() {
    return <SearchPageContainer />
}

SearchCourse.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}
