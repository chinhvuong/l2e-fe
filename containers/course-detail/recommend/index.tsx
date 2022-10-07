import * as React from 'react'
import AlsoBought from './also-bought'
import SameAuthorCourses from './same-author-courses'

export interface IRecommendProps {}

export default function Recommend() {
    return (
        <div className="flex justify-center">
            <div className="2xl:w-[1250px]">
                <div className="w-[820px] ml-[10px] space-y-5 mt-5">
                    <SameAuthorCourses />
                    <AlsoBought />
                </div>
            </div>
        </div>
    )
}
