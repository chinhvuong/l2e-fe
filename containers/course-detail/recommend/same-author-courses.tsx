import VerticalCourseList from '@/components/common/vertical-course-list'
import { dataCourses_preview_list } from '@/data/course-preview'
import * as React from 'react'

export interface ISameAuthorCoursesProps {}

export default function SameAuthorCourses() {
    return (
        <div className="space-y-2">
            <div className="font-semibold text-[26px]">
                More courses by{' '}
                <span className="text-hyperlink">Dr. Angela Vu </span>
            </div>
            <VerticalCourseList data={dataCourses_preview_list} />
        </div>
    )
}
