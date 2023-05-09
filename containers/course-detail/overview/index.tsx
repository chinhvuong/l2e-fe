import IncludeList from '../components/include-list'
import Description from './description'
import Requirement from './requirement'
import WhatYouWillLearn from './what-you-will-learn'

export interface IOverviewProps {}

export default function Overview() {
    const includeList = {
        duration: '65 hours on-demand video',
        resource: '49 downloadable resources',
        assignments: 'Assignments',
        certificate: 'Certificate of completion',
        lifetimeAccess: 'Full lifetime access',
        device: 'Access on mobile and TV',
        articles: '85 articles',
        exercise: '8 coding exercises',
    }
    return (
        <div className="space-y-7" id="overview-section">
            <WhatYouWillLearn />
            <IncludeList data={includeList} className="2xl:hidden" />
            <Requirement />
            <Description />
        </div>
    )
}
