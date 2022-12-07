import InstructorContainer from '@/containers/instructor'
import InstructorLayout from '@/layout/instructor-layout'
import { ReactElement } from 'react'

export default function MyCourse() {
    return <InstructorContainer />
}

MyCourse.getLayout = function getLayout(page: ReactElement) {
    return <InstructorLayout>{page}</InstructorLayout>
}
