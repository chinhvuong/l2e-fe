import { dataCourses_detail } from '@/data/course-detail'
import IncludeList from '../components/include-list'
import Description from './description'
import Requirement from './requirement'
import WhatYouWillLearn from './what-you-will-learn'

export interface IOverviewProps {}

export default function Overview() {
    return (
        <div className="space-y-7" id="overview-section">
            <WhatYouWillLearn />
            <IncludeList
                data={dataCourses_detail.include}
                className="2xl:hidden"
            />
            <Requirement />
            <Description />
        </div>
    )
}
