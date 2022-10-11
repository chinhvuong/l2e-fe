import * as React from 'react'
import CourseContent from './course-content'
import Description from './description'
import Requirement from './requirement'
import WhatYouWillLearn from './what-you-will-learn'

export interface ICurriculumProps {}

export default function Curriculum({}) {
    return (
        <div className="space-y-7">
            <WhatYouWillLearn />
            <CourseContent />
            <Requirement />
            <Description />
        </div>
    )
}
