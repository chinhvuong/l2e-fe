import CourseDetailListSwiper from '@/components/common/course-detail-list-swiper'
import Button from '@/components/core/button'
import { dataCourses_preview } from '@/data/course-preview'
import * as React from 'react'

export interface ISameAuthorCoursesProps {}

export default function SameAuthorCourses() {
    return (
        <div>
            <div className="font-semibold text-[26px]">
                More course by{' '}
                <span className="text-hyperlink">Dr. Angela Vu </span>
            </div>
            <CourseDetailListSwiper
                data={dataCourses_preview}
                title="Students are viewing"
                className="w-fit"
            />
            <Button className="btn-primary-outline w-full">
                <div className="font-medium text-[16px]">Report abuse</div>
            </Button>
        </div>
    )
}
