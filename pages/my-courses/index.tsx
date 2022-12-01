import MyCoursesContainer from '@/containers/my-courses'
import * as React from 'react'
import type { ReactElement } from 'react'
import MyCoursesLayout from '@/layout/my-courses-layout'

export default function MyCourse() {
    return <MyCoursesContainer />
}

MyCourse.getLayout = function getLayout(page: ReactElement) {
    return <MyCoursesLayout>{page}</MyCoursesLayout>
}
