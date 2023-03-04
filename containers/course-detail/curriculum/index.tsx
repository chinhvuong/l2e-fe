import { dataCourses_detail } from '@/data/course-detail'
import IncludeList from '../components/include-list'
import { useCourseDetailContext } from '../course-detail-context'
import CourseContent from './course-content'
import Description from './description'
import Requirement from './requirement'
import WhatYouWillLearn from './what-you-will-learn'

export interface ICurriculumProps {}

export default function Curriculum() {
    const { data } = useCourseDetailContext()

    if (!data || !data.sections) {
        return <></>
    }

    return (
        <div className="space-y-7" id="curriculum-section">
            <WhatYouWillLearn />
            <IncludeList
                data={dataCourses_detail.include}
                className="2xl:hidden"
            />
            <CourseContent sections={data.sections} />
            <Requirement />
            <Description />
        </div>
    )
}
