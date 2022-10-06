import { dataCourses_detail } from '@/data/data-course-detail'
import * as React from 'react'
import Curriculum from './curriculum'
import CourseInfo from './info'
import InstructorList from './instructor'
import Review from './review'

export default function CourseDetailContainer() {
    return (
        <div>
            <CourseInfo info={dataCourses_detail.info} />
            <Curriculum />
            <InstructorList />
            <Review />
        </div>
    )
}
