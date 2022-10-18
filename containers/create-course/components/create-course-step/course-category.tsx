import Select from '@/components/core/select'
import * as React from 'react'

export interface ICourseCategoryProps {}

export default function CourseCategory() {
    const category = [
        'IT',
        'Health',
        'Language',
        'Business',
        'Management',
        'Personal & Development',
        'Sales & Marketing',
        'Engineering & Construction',
        'Teaching & Academics',
    ]
    return (
        <div className="flex flex-col items-center">
            <div className="text-3xl mt-16 mb-6 font-bold">{`How about a course title?`}</div>
            <div className="mb-12">{`It's ok if you can't think of a good title now. You can change it later.`}</div>
            <div className="w-[700px]">
                <Select selectList={category} placeholder="Select category" />
            </div>
        </div>
    )
}
