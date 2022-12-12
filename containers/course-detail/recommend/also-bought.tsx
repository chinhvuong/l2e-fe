import VerticalCourseList from '@/components/common/vertical-course-list'
import Button from '@/components/core/button'
import { dataCourses_preview_list } from '@/data/course-preview'
import * as React from 'react'

export interface IAlsoBoughtProps {}

export default function AlsoBought() {
    return (
        <div className="space-y-2">
            <div className="font-semibold text-[26px]">
                Students also bought
            </div>
            <VerticalCourseList data={dataCourses_preview_list} />
        </div>
    )
}
