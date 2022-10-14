import CurriculumContainer from '@/containers/create-course/curriculum'
import CreateCourseLayout from '@/layout/create-course-layout'
import type { ReactElement } from 'react'

export interface ICreateCourseProps {}

export default function CreateCourse() {
    return <CurriculumContainer />
}

CreateCourse.getLayout = function getLayout(page: ReactElement) {
    return <CreateCourseLayout>{page}</CreateCourseLayout>
}
