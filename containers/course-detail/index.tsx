import { dataCourses_detail } from '@/data/data-course-detail'
import * as React from 'react'
import Curriculum from './curriculum'
import CourseInfo from './info'
import InstructorList from './instructor'
import Recommend from './recommend'
import Review from './review'

export default function CourseDetailContainer() {
    return (
        <div className="space-y-10">
            <CourseInfo info={dataCourses_detail.info} />
            <Curriculum />
            <InstructorList />
            <Review />
            <Recommend />
        </div>
    )
}
