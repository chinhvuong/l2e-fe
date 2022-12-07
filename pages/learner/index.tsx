import LearnerContainer from '@/containers/learner'
import LearnerLayout from '@/layout/learner-layout'
import { ReactElement } from 'react'

export default function MyCourse() {
    return <LearnerContainer />
}

MyCourse.getLayout = function getLayout(page: ReactElement) {
    return <LearnerLayout>{page}</LearnerLayout>
}
