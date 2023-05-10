import ProfilePageContainer from '@/containers/create-course/profile'
import CreateCourseLayout from '@/layout/create-course-layout/course-detail'
import type { ReactElement } from 'react'

export interface ICreateCourseProps {}

export default function ProfilePageCreateCourse() {
    return <ProfilePageContainer />
}

ProfilePageCreateCourse.getLayout = function getLayout(page: ReactElement) {
    return <CreateCourseLayout>{page}</CreateCourseLayout>
}
