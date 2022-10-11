import Breadcrumb from '@/components/core/breadcrumb'
import RatingStar from '@/components/core/course-card/rating-star'
import Label from '@/components/core/label'
import * as React from 'react'
import { faExclamationCircle, faGlobe } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Sidebar from './sidebar'
import { useSelector } from 'react-redux'
import { getCourseOverviewInfo } from '@/store/course/selectors'

export default function CourseInfo() {
    const data = useSelector(getCourseOverviewInfo)

    const breadcrumb = [
        {
            text: 'Home',
            href: '/',
        },
        {
            text: 'About Us',
            href: '/about-us',
        },
    ]

    return (
        <div className="bg-black flex justify-center">
            <div className="2xl:w-[1250px] lg:w-[700px] md:w-[560px] sm:w-[450px] px-[30px] py-10 flex justify-between relative">
                <div className="w-[800px] text-white space-y-5">
                    <Breadcrumb data={breadcrumb} />
                    <div className="font-bold text-[35px] leading-[45px]">
                        {data.name}
                    </div>
                    <div className="text-[20px]">{data.overview}</div>
                    <div className="flex items-center space-x-4">
                        {data.isBestseller && <Label name="Bestseller" />}
                        <Label name="IT" />
                        <RatingStar id={data._id} ratingScore={data.rating} />
                        <div className="text-[14px] font-light underline decoration-hyperlink-light text-hyperlink-light cursor-pointer">
                            {`(${data.reviews.toLocaleString()} ratings)`}
                        </div>
                        <div className="text-[14px] font-light">
                            {`${data.students.toLocaleString()} students`}
                        </div>
                    </div>
                    <div className="text-[14px] font-light">
                        Created by{' '}
                        <span className="text-hyperlink-light underline decoration-hyperlink-light cursor-pointer">
                            {data.owner}
                        </span>
                    </div>
                    <div className="flex text-[14px] font-light space-x-6">
                        <div className="flex items-center space-x-2">
                            <FontAwesomeIcon icon={faExclamationCircle} />
                            <div>{`Last updated ${data.updatedAt.getMonth()}/${data.updatedAt.getFullYear()}`}</div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <FontAwesomeIcon icon={faGlobe} />
                            <div>{data.language}</div>
                        </div>
                    </div>
                </div>
                <Sidebar />
            </div>
        </div>
    )
}
