import LearnerPerformanceContainer from '@/containers/learner/components/performance'
import LearnerLayout from '@/layout/learner-layout'
import { ReactElement } from 'react'

export default function MyPerformance() {
    return <LearnerPerformanceContainer />
}

MyPerformance.getLayout = function getLayout(page: ReactElement) {
    return <LearnerLayout>{page}</LearnerLayout>
}
