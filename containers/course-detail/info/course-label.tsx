import Button from '@/components/core/button'
import RatingStar from '@/components/core/course-card/rating-star'
import Label from '@/components/core/label'
import { CourseInfo } from '@/constants/interfaces'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShareNodes } from '@fortawesome/free-solid-svg-icons'

export interface ICourseLabelProps {}

export default function CourseLabel({ info }: { info: CourseInfo }) {
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

    return (
        <div
            className={`h-[80px] w-full bg-black z-20 py-3 px-[30px] 2xl:top-0 under_2xl:bottom-0 under_2xl:fixed ${
                scrollY <= 500 ? 'hidden' : 'sticky'
            }`}
        >
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <div className="font-bold text-white text-[18px]">
                        MAC 1140 Precalculus Algebra
                    </div>
                    <div className="flex items-center space-x-4">
                        {info.isBestseller && <Label type="bestseller" />}
                        <Label type="engineer_construction" />
                        <RatingStar
                            id={info.id}
                            ratingScore={info.ratingScore}
                        />
                        <div className="text-[14px] font-light underline decoration-hyperlink-light text-hyperlink-light cursor-pointer">
                            {`(${info.ratings} ratings)`}
                        </div>
                        <div className="text-[14px] font-light">
                            {`${info.students} students`}
                        </div>
                    </div>
                </div>
                <div className="2xl:hidden flex items-center space-x-3">
                    <div className="font-semibold text-[24px] text-white">
                        $14.81
                    </div>
                    <Button className="btn-primary w-full">
                        <div className="text-white font-medium text-[20px]">
                            Enroll
                        </div>
                    </Button>
                    <FontAwesomeIcon
                        icon={faShareNodes}
                        className="text-[20px] rounded-full bg-white py-[14px] px-[16px] border border-black"
                    />
                </div>
            </div>
        </div>
    )
}
