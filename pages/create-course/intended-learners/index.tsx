import IntendedLearnersContainer from '@/containers/create-course/intended-learners'
import CreateCourseLayout from '@/layout/create-course-layout'
import type { ReactElement } from 'react'

export interface ICreateCourseProps {}

export default function CreateCourse() {
    return <IntendedLearnersContainer />
}

CreateCourse.getLayout = function getLayout(page: ReactElement) {
    return <CreateCourseLayout>{page}</CreateCourseLayout>
}
