import * as React from 'react'
import AlsoBought from './also-bought'
import SameAuthorCourses from './same-author-courses'

export interface IRecommendProps {}

export default function Recommend() {
    return (
        <div className="space-y-7">
            <SameAuthorCourses />
            <AlsoBought />
        </div>
    )
}
