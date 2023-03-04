import LearnerCoursesContainer from '@/containers/learner/components/courses'
import LearnerLayout from '@/layout/learner-layout'
import { ReactElement } from 'react'

export default function MyCourse() {
    return <LearnerCoursesContainer />
}

MyCourse.getLayout = function getLayout(page: ReactElement) {
    return <LearnerLayout>{page}</LearnerLayout>
}
