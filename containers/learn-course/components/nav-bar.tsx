import { Dispatch, SetStateAction, useEffect, useState } from 'react'

export interface INavBarProps {
    currentTab: string
    setCurrentTab: Dispatch<SetStateAction<string>>
}

export default function NavBarLearner({
    currentTab,
    setCurrentTab,
}: INavBarProps) {
    const menu = ['Overview', 'Instructor', 'Ratings', 'Comments']

    const [currentTabName, setCurrentTabName] = useState(currentTab)

    const handleChangeTab = (tab: string) => {
        setCurrentTabName(tab)
        setCurrentTab(tab)
    }

    useEffect(() => {
        setCurrentTabName(currentTab)
    }, [currentTab])

    return (
        <div
            className={`flex pl-20 space-x-10 bg-white drop-shadow-lg sticky z-20 top-0 under_xl:pl-0 under_xl:justify-center`}
        >
            {menu.map((item, index) => {
                return (
                    <div
                        className={`font-bold hover:cursor-pointer py-3 ${
                            currentTabName === item
                                ? 'border-b-2 border-second text-second'
                                : 'text-description'
                        }`}
                        key={index}
                        onClick={() => handleChangeTab(item)}
                    >
                        {item}
                    </div>
                )
            })}
            <div
                className={`font-bold hover:cursor-pointer py-3 above_xl:hidden ${
                    currentTabName === 'Curriculum'
                        ? 'border-b-2 border-second text-second'
                        : 'text-description'
                }`}
                onClick={() => handleChangeTab('Curriculum')}
            >
                {'Curriculum'}
            </div>
        </div>
    )
}
