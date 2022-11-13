import CourseBasicCreateContainer from '@/containers/create-course'
import CourseBasicCreateLayout from '@/layout/create-course-layout/course-basic'
import type { ReactElement } from 'react'

export interface ICreateCourseProps {}

export default function CreateCourse() {
    return <CourseBasicCreateContainer />
}

CreateCourse.getLayout = function getLayout(page: ReactElement) {
    return <CourseBasicCreateLayout>{page}</CourseBasicCreateLayout>
}
