import LearnPageContainer from '@/containers/learn-course'
import LearnCourseLayout from '@/layout/learn-course-layout'
import type { ReactElement } from 'react'

export interface ILearnCourseProps {}

export default function LearnCourse() {
    return <LearnPageContainer />
}

LearnCourse.getLayout = function getLayout(page: ReactElement) {
    return <LearnCourseLayout>{page}</LearnCourseLayout>
}
