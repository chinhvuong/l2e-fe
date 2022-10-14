import LandingPageContainer from '@/containers/create-course/landing-page'
import CreateCourseLayout from '@/layout/create-course-layout'
import type { ReactElement } from 'react'

export interface ICreateCourseProps {}

export default function CreateCourse() {
    return <LandingPageContainer />
}

CreateCourse.getLayout = function getLayout(page: ReactElement) {
    return <CreateCourseLayout>{page}</CreateCourseLayout>
}
