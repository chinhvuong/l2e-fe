import QuizCointainer from '@/containers/instructor/quiz'
import CreateCourseLayout from '@/layout/create-course-layout/course-detail'
import type { ReactElement } from 'react'

export interface ICreateCourseProps {}

export default function QuizPageCreateCourse() {
    return <QuizCointainer />
}

QuizPageCreateCourse.getLayout = function getLayout(page: ReactElement) {
    return <CreateCourseLayout>{page}</CreateCourseLayout>
}