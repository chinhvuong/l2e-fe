import Input from '@/components/core/input'
import * as React from 'react'

export interface ICourseTitleProps {
    defaultValue: string
    setTitle: Function
}

export default function CourseTitle({
    defaultValue,
    setTitle,
}: ICourseTitleProps) {
    return (
        <div className="flex flex-col items-center">
            <div className="text-3xl mt-16 mb-6 font-bold">{`How about a course title?`}</div>
            <div className="mb-12">{`It's ok if you can't think of a good title now. You can change it later.`}</div>
            <div className="w-[700px]">
                <Input
                    id="course-title"
                    charLimit={{ minLength: 0, maxLength: 60 }}
                    placeholder="E.g. Learn Photoshop ES6 from Scratch"
                    updateInput={setTitle}
                    defaultValue={defaultValue}
                />
            </div>
        </div>
    )
}
