import { useState, useEffect } from 'react'

export interface INavBarProps {}

export default function NavBar() {
    const menu = ['Overview', 'Curriculum', 'Instructor', 'Reviews']
    const menuTarget = [
        'overview-section',
        'curriculum-section',
        'instructor-section',
        'reviews-section',
    ]

    const [scrollY, setScrollY] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY)
        }

        handleScroll()

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const navigate = (target: string) => {
        const el = document.getElementById(target)
        let screenPosition
        if (el) {
            screenPosition = el.getBoundingClientRect()
        }
        if (screenPosition?.y) {
            window.scrollBy({
                top: screenPosition?.y - 60,
                behavior: 'smooth',
            })
        }
    }

    return (
        <div
            className={`flex justify-around bg-white drop-shadow-lg	 ${
                scrollY <= 1200 ? 'hidden' : 'sticky z-20 under_2xl:top-0'
            }`}
        >
            {menu.map((item, index) => {
                return (
                    <div
                        className="text-hyperlink font-bold cursor-pointer py-3 under_lg:text-xs"
                        key={index}
                        onClick={() => navigate(menuTarget[index])}
                    >
                        {item}
                    </div>
                )
            })}
        </div>
    )
}
