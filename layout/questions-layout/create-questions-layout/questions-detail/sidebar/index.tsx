import Router, { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export interface ISidebarProps {}

export default function QuestionsSidebar() {
    const menu = ['Questions', 'Quiz']

    const menuTarget = ['', 'quiz']
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
        <>
            <div className="flex flex-col justify-start w-[300px] pt-7">
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
            </div>
        </>
    )
}
