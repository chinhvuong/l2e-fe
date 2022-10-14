import PriceContainer from '@/containers/create-course/price'
import CreateCourseLayout from '@/layout/create-course-layout'
import type { ReactElement } from 'react'

export interface ICreateCourseProps {}

export default function CreateCourse() {
    return <PriceContainer />
}

CreateCourse.getLayout = function getLayout(page: ReactElement) {
    return <CreateCourseLayout>{page}</CreateCourseLayout>
}
