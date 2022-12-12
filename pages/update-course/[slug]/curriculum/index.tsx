import CurriculumContainer from '@/containers/create-course/curriculum'
import CreateCourseLayout from '@/layout/create-course-layout/course-detail'
import type { ReactElement } from 'react'

export interface ICreateCourseProps {}

export default function CurriculumCreateCourse() {
    return <CurriculumContainer />
}

CurriculumCreateCourse.getLayout = function getLayout(page: ReactElement) {
    return <CreateCourseLayout>{page}</CreateCourseLayout>
}
