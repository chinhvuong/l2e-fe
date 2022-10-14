import MessagesContainer from '@/containers/create-course/messages'
import CreateCourseLayout from '@/layout/create-course-layout'
import type { ReactElement } from 'react'

export interface ICreateCourseProps {}

export default function CreateCourse() {
    return <MessagesContainer />
}

CreateCourse.getLayout = function getLayout(page: ReactElement) {
    return <CreateCourseLayout>{page}</CreateCourseLayout>
}
