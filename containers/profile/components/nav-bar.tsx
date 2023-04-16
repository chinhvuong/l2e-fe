import { Dispatch, SetStateAction, useState } from 'react'

export interface INavBarProps {
    setCurrentTab: Dispatch<SetStateAction<string>>
}

export default function NavBarProfile({ setCurrentTab }: INavBarProps) {
    const menu = ['Certifications']

    const [currentTabName, setCurrentTabName] = useState('Certifications')

    const handleChangeTab = (tab: string) => {
        setCurrentTabName(tab)
        setCurrentTab(tab)
    }

    return (
        <div
            className={`flex pl-20 space-x-10 bg-white drop-shadow-lg sticky z-20 top-0`}
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
        </div>
    )
}
