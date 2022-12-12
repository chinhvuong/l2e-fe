import IntendedLearnersContainer from '@/containers/create-course/intended-learners'
import CreateCourseLayout from '@/layout/create-course-layout/course-detail'
import type { ReactElement } from 'react'

export interface ICreateCourseProps {}

export default function IntendedLearnerCreateCourse() {
    return <IntendedLearnersContainer />
}

IntendedLearnerCreateCourse.getLayout = function getLayout(page: ReactElement) {
    return <CreateCourseLayout>{page}</CreateCourseLayout>
}
