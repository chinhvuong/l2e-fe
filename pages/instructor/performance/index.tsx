import InstructorPerformanceContainer from '@/containers/instructor/components/performance'
import InstructorLayout from '@/layout/instructor-layout'
import { ReactElement } from 'react'

export default function MyPerformance() {
    return <InstructorPerformanceContainer />
}

MyPerformance.getLayout = function getLayout(page: ReactElement) {
    return <InstructorLayout>{page}</InstructorLayout>
}
