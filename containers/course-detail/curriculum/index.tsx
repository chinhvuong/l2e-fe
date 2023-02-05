import { dataCourses_detail } from '@/data/course-detail'
import { useAppSelector } from '@/hooks'
import { getCourseSectionsWithNestedLectures } from '@/store/course/selectors'
import { CourseSectionWithLectures } from '@/store/course/types'
import * as React from 'react'
import IncludeList from '../components/include-list'
import CourseContent from './course-content'
import Description from './description'
import Requirement from './requirement'
import WhatYouWillLearn from './what-you-will-learn'

export interface ICurriculumProps {}

export default function Curriculum() {
    const data = useAppSelector(getCourseSectionsWithNestedLectures)

    return (
        <div className="space-y-7" id="curriculum-section">
            <WhatYouWillLearn />
            <IncludeList
                data={dataCourses_detail.include}
                className="2xl:hidden"
            />
            <CourseContent sections={data} />
            <Requirement />
            <Description />
        </div>
    )
}
