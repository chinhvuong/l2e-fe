import Button from '@/components/core/button'
import RatingStar from '@/components/core/course-card/rating-star'
import Label from '@/components/core/label'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShareNodes } from '@fortawesome/free-solid-svg-icons'
import { courseCatagories } from '@/data/category'
import { useSelector } from 'react-redux'
import { getCourseLabelInfo } from '@/store/course/selectors'

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
                <div className="space-y-1 w-[650px] lg:w-[450px] md:hidden sm:hidden">
                    <div className="font-bold text-white text-[18px] line-clamp-1">
                        {data.name}
                    </div>
                    <div className="flex items-center 2xl:space-x-4 xl:space-x-4 under_xl">
                        <div className="under_xl:hidden">
                            {data.isBestseller && <Label name="Bestseller" />}
                        </div>
                        <div className="under_xl:hidden">
                            <Label name={getCourseCategory()} />
                        </div>
                        <RatingStar id={data._id} ratingScore={data.rating} />
                        <div className="text-[14px] font-light underline decoration-hyperlink-light text-hyperlink-light cursor-pointer under_xl:mx-3">
                            {`(${data.reviews.toLocaleString()} ratings)`}
                        </div>
                        <div className="text-[14px] font-light text-white">
                            {`${data.students.toLocaleString()} students`}
                        </div>
                    </div>
                </div>
                <div className="2xl:hidden flex items-center space-x-3 md:w-full sm:w-full">
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
