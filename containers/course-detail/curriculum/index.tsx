import * as React from 'react'
import Company from './company'
import CourseContent from './course-content'
import Description from './description'
import Requirement from './requirement'
import WhatYouWillLearn from './what-you-will-learn'

export interface ICurriculumProps {}

export default function Curriculum() {
    return (
        <div className="w-[820px] ml-[110px] space-y-5 mt-5">
            <WhatYouWillLearn />
            <Company />
            <CourseContent />
            <Requirement />
            <Description />
        </div>
    )
}
