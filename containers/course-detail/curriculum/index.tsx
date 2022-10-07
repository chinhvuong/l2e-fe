import * as React from 'react'
import Company from './company'
import CourseContent from './course-content'
import Description from './description'
import Requirement from './requirement'
import WhatYouWillLearn from './what-you-will-learn'

export interface ICurriculumProps {}

export default function Curriculum() {
    return (
        <div className="flex justify-center">
            <div className="2xl:w-[1250px]">
                <div className="w-[820px] mx-[30px] space-y-5 mt-5">
                    <WhatYouWillLearn />
                    <Company />
                    <CourseContent />
                    <Requirement />
                    <Description />
                </div>
            </div>
        </div>
    )
}
