import Button from '@/components/core/button'
import CourseCard from '@/components/core/course-card'
import { CourseInfo_Preview } from '@/constants/interfaces'
import * as React from 'react'

export interface ISameAuthorCoursesProps {}

export default function SameAuthorCourses() {
    const dataCourses_preview: CourseInfo_Preview[] = [
        {
            id: 1,
            thumbnail: '/svgs/thumbnails/thumbnail_1.svg',
            title: 'MAC 1140 Precalculus Algebra',
            authors: 'Theresa Webb, Hữu An, Dianne Russell',
            ratingScore: 4.7,
            ratings: '123,123',
            price: '$8.99',
            isBestseller: true,
            category: 'management',
        },
        {
            id: 2,
            thumbnail: '/svgs/thumbnails/thumbnail_2.svg',
            title: 'MAC 20311 Analytic Geometry and Calculus 1 MAC 20311 Analytic Geometry and Calculus 1',
            authors: 'Dianne Russell, Chính Vương, Dianne Russell',
            ratingScore: 4.7,
            ratings: '123,123',
            price: '$4.23',
            isBestseller: false,
            category: 'it',
        },
        {
            id: 3,
            thumbnail: '/svgs/thumbnails/thumbnail_3.svg',
            title: 'ACG 2021 Financial Accounting',
            authors: 'Courtney Henry, Việt Hòa, Dianne Russell',
            ratingScore: 4.7,
            ratings: '123,123',
            price: '$5.32',
            isBestseller: false,
            category: 'language',
        },
    ]
    return (
        <div className="w-[820px] ml-[110px] mt-5">
            <div className="font-semibold text-[26px]">
                More course by{' '}
                <span className="text-hyperlink">Dr. Angela Vu </span>
            </div>
            <div className="flex items-center w-fit space-x-5 mt-5 mb-10">
                {dataCourses_preview.map((course) => {
                    return (
                        <CourseCard
                            key={course.id}
                            info={course}
                            className="w-[250px]"
                        />
                    )
                })}
            </div>
            <Button className="btn-primary-outline w-full">
                <div className="font-medium text-[16px]">Report abuse</div>
            </Button>
        </div>
    )
}
