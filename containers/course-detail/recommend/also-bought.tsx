import CourseDetailListSwiper from '@/components/common/course-detail-list-swiper'
import Button from '@/components/core/button'
import { dataCourses_preview } from '@/data/course-preview'
import * as React from 'react'

export interface IAlsoBoughtProps {}

export default function AlsoBought() {
    return (
        <div>
            <div className="font-semibold text-[26px]">
                Students also bought
            </div>
            <div className="flex justify-center">
                <CourseDetailListSwiper
                    data={dataCourses_preview}
                    className="w-fit mb-5 sm:w-[390px]"
                />
            </div>
            <Button className="btn-primary-outline w-full">
                <div className="font-medium text-[16px]">Report abuse</div>
            </Button>
        </div>
    )
}
