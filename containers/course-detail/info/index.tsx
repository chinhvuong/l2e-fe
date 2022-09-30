import Breadcrumb from '@/components/core/breadcrumb'
import RatingStar from '@/components/core/course-card/ratingStar'
import Label from '@/components/core/label'
import * as React from 'react'
import {
    faExclamationCircle,
    faGlobe,
    faClosedCaptioning,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CourseInfo as ICourseInfo } from '@/contants/interfaces'

export default function CourseInfo({ info }: { info: ICourseInfo }) {
    const data = [
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
        <div className="bg-black px-[130px] py-10 flex justify-between relative">
            <div className="w-[800px] text-white space-y-5">
                <Breadcrumb data={data} />
                <div className="font-bold text-[35px] leading-[45px]">
                    {info.title}
                </div>
                <div className="text-[20px]">{info.description}</div>
                <div className="flex items-center space-x-4">
                    {info.isBestseller && <Label type="bestseller" />}
                    <RatingStar
                        id={info.id}
                        ratingScore={info.ratingScore}
                        ratings={info.ratings}
                    />
                    <div className="text-[14px] font-light underline decoration-hyperlink-light text-hyperlink-light">
                        {`(${info.ratings} ratings)`}
                    </div>
                    <div className="text-[14px] font-light">
                        {`${info.students} students`}
                    </div>
                </div>
                <div className="text-[14px] font-light">
                    Created by{' '}
                    <span className="text-hyperlink-light underline decoration-hyperlink-light">
                        {info.authors}
                    </span>
                </div>
                <div className="flex text-[14px] font-light space-x-6">
                    <div className="flex items-center space-x-2">
                        <FontAwesomeIcon icon={faExclamationCircle} />
                        <div>{`Last updated ${info.lastUpdated.getMonth()}/${info.lastUpdated.getFullYear()}`}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <FontAwesomeIcon icon={faGlobe} />
                        <div>{info.language}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <FontAwesomeIcon icon={faClosedCaptioning} />
                        <div>
                            {info.captions}
                            <span className="text-hyperlink-light underline decoration-hyperlink-light">
                                12 more
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-star z-10 w-[350px] h-[500px] absolute right-[130px]"></div>
        </div>
    )
}
