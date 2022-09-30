import { dataCourses_detail } from '@/data/data-course-detail'
import * as React from 'react'
import CourseInfo from './info'

export default function CourseDetail() {
    return (
        <div>
            <CourseInfo info={dataCourses_detail.info} />
        </div>
    )
}
