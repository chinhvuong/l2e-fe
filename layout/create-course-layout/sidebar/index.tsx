import Button from '@/components/core/button'
import Router from 'next/router'
import * as React from 'react'

export interface ISidebarProps {}

export default function Sidebar() {
    const menu = [
        'Landing page',
        'Intended learners',
        'Curriculum',
        'Course messages',
    ]

    const menuTarget = [
        '/landing-page',
        '/intended-learners',
        '/curriculum',
        '/messages',
    ]

    const goToMenuTarget = (target: string) => {
        Router.push('/create-course' + target)
    }

    return (
        <div className="space-y-5 flex flex-col justify-start w-[300px] pt-7">
            <div className="space-y-2 flex flex-col">
                {menu.map((item, index) => {
                    return (
                        <div
                            className="cursor-pointer hover:bg-primary hover:text-white py-3 px-5 font-medium text-lg"
                            key={index}
                            onClick={() => goToMenuTarget(menuTarget[index])}
                        >
                            {item}
                        </div>
                    )
                })}
            </div>
            <Button>
                <div className="text-white font-semibold">
                    Submit for Review
                </div>
            </Button>
        </div>
    )
}
