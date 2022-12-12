import MessagesContainer from '@/containers/create-course/messages'
import CreateCourseLayout from '@/layout/create-course-layout/course-detail'
import type { ReactElement } from 'react'

export interface ICreateCourseProps {}

export default function MessagesCreateCourse() {
    return <MessagesContainer />
}

MessagesCreateCourse.getLayout = function getLayout(page: ReactElement) {
    return <CreateCourseLayout>{page}</CreateCourseLayout>
}
