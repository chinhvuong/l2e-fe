import LandingPageContainer from '@/containers/create-course/landing-page'
import CreateCourseLayout from '@/layout/create-course-layout/course-detail'
import type { ReactElement } from 'react'

export interface ICreateCourseProps {}

export default function LandingPageCreateCourse() {
    return <LandingPageContainer />
}

LandingPageCreateCourse.getLayout = function getLayout(page: ReactElement) {
    return <CreateCourseLayout>{page}</CreateCourseLayout>
}
