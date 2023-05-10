import Logo from '@/layout/main-layout/header/logo'
import {
    faAward,
    faChartSimple,
    faTv,
    faUser,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Router, { useRouter } from 'next/router'
import { useState } from 'react'

export interface IMyCoursesLayoutProps {}

export default function Sidebar() {
    const menu = ['Profile', 'Certificates']
    const menuTarget = ['detail', 'certificates']
    const router = useRouter()
    const [currentTab, setCurrentTab] = useState(() => {
        const list = router.route.split('/')
        return list[list.length - 1]
    })

    const goToHomePage = () => {
        Router.push('/')
    }

    const goToMenuTarget = (index: number) => {
        setCurrentTab(menuTarget[index])
        Router.push(`/profile/${menuTarget[index]}`)
    }

    const getSidebarIcon = (name: string) => {
        switch (name) {
            case 'Profile':
                return (
                    <div className="w-[25px] flex justify-center">
                        <FontAwesomeIcon
                            icon={faUser}
                            className="text-[20px] text-white"
                        />
                    </div>
                )
            case 'Certificates':
                return (
                    <div className="w-[25px] flex justify-center">
                        <FontAwesomeIcon
                            icon={faAward}
                            className="text-[20px] text-white"
                        />
                    </div>
                )
        }
    }

    const handleChangeTab = (index: number) => {
        goToMenuTarget(index)
    }

    return (
        <div className="bg-second w-[300px] flex flex-col items-center pt-4">
            <Logo
                darkTheme={true}
                onClick={() => goToHomePage()}
                className="mb-10 cursor-pointer"
            />
            <div className="space-y-2 flex flex-col w-full">
                {menu.map((item, index) => {
                    return (
                        <div
                            className={`cursor-pointer py-3 px-5 w-full font-medium text-lg hover:bg-primary ${
                                currentTab === menuTarget[index]
                                    ? 'border-l-4 border-primary'
                                    : 'pl-6'
                            }`}
                            key={index}
                            onClick={() => handleChangeTab(index)}
                        >
                            <div className="flex space-x-3 items-center">
                                {getSidebarIcon(item)}
                                <div className="text-white">{item}</div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
