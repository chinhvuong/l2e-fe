import Button from '@/components/core/button'
import RatingStar from '@/components/core/course-card/rating-star'
import Label from '@/components/core/label'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShareNodes } from '@fortawesome/free-solid-svg-icons'
import { courseCatagories } from '@/data/category'
import { useSelector } from 'react-redux'
import { getCourseLabelInfo } from '@/state/course/selectors'

export interface ICourseLabelProps {}

export default function CourseLabel() {
    const [scrollY, setScrollY] = useState(0)
    const data = useSelector(getCourseLabelInfo)

    const getCourseCategory = () => {
        for (let i = 0; i < courseCatagories.length; i++) {
            if (courseCatagories[i]._id === data.category) {
                return courseCatagories[i].name
            }
        }
        return 'IT'
    }

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
                        {data.name}
                    </div>
                    <div className="flex items-center space-x-4">
                        {data.isBestseller && <Label name="Bestseller" />}
                        <Label name={getCourseCategory()} />
                        <RatingStar id={data._id} ratingScore={data.rating} />
                        <div className="text-[14px] font-light underline decoration-hyperlink-light text-hyperlink-light cursor-pointer">
                            {`(${data.reviews.toLocaleString()} ratings)`}
                        </div>
                        <div className="text-[14px] font-light">
                            {`${data.students} students`}
                        </div>
                    </div>
                </div>
                <div className="2xl:hidden flex items-center space-x-3">
                    <div className="font-semibold text-[24px] text-white">
                        {data.price}
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
