import QuestionBankContainers from '@/containers/instructor/questionbank'
import CreateCourseLayout from '@/layout/create-course-layout/course-detail'
import type { ReactElement } from 'react'

export interface ICreateCourseProps {}

export default function QuestionPageCreateCourse() {
    return <QuestionBankContainers />
}

QuestionPageCreateCourse.getLayout = function getLayout(page: ReactElement) {
    return <CreateCourseLayout>{page}</CreateCourseLayout>
}
