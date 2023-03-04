import InstructorCoursesContainer from '@/containers/instructor/components/courses'
import InstructorLayout from '@/layout/instructor-layout'
import { ReactElement } from 'react'

export default function MyCourse() {
    return <InstructorCoursesContainer />
}

MyCourse.getLayout = function getLayout(page: ReactElement) {
    return <InstructorLayout>{page}</InstructorLayout>
}
