import Button from '@/components/core/button'
import * as React from 'react'
import Router from 'next/router'

export default function InstructorContainer() {
    const goToCreateCoursePage = () => {
        Router.push('/create-course')
    }

    return (
        <div className="space-x-10 px-14 py-8 h-full">
            <div className="2xl:w-[805px] xl:w-[805px] lg:w-[635px] md:w-[485px] sm:w-[285px] mb-[10px]">
                <div className="font-semibold text-[30px]">My courses</div>
                <div className="text-white mt-10">
                    <Button onClick={() => goToCreateCoursePage()}>
                        Create course
                    </Button>
                </div>
            </div>
        </div>
    )
}
