import Button from '@/components/core/button'
import Router, { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export interface ISidebarProps {}

export default function Sidebar() {
    const menu = [
        'Landing page',
        'Intended learners',
        'Curriculum',
        'Course messages',
    ]

    const menuTarget = [
        'landing-page',
        'intended-learners',
        'curriculum',
        'messages',
    ]
    const router = useRouter()
    const [courseId, setCourseId] = useState('')
    const [currentTab, setCurrentTab] = useState(() => {
        const list = router.route.split('/')
        return list[list.length - 1]
    })

    useEffect(() => {
        setCourseId(getCourseId())
    }, [router.query.slug])

    const getCourseId = () => {
        if (typeof router.query.slug === 'object') {
            return router.query.slug[0]
        }
        return router.query.slug
    }

    const goToMenuTarget = (index: number) => {
        setCurrentTab(menuTarget[index])
        Router.push(`/create-course/${courseId}/${menuTarget[index]}`)
    }
    return (
        <div className="space-y-10 flex flex-col justify-start w-[300px] pt-7">
            <div className="space-y-2 flex flex-col">
                {menu.map((item, index) => {
                    return (
                        <div
                            className={`cursor-pointer rounded-r-full py-3 px-5 font-medium text-lg ${
                                currentTab === menuTarget[index]
                                    ? 'bg-primary text-white hover:bg-primary'
                                    : 'hover:bg-divider'
                            }`}
                            key={index}
                            onClick={() => goToMenuTarget(index)}
                        >
                            {item}
                        </div>
                    )
                })}
            </div>
            <Button>
                <div className="font-semibold">Submit for Review</div>
            </Button>
        </div>
    )
}
