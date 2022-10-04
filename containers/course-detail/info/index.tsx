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
import { CourseInfo as ICourseInfo } from '@/constants/interfaces'
import Sidebar from './sidebar'

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

    const getCaptions = () => {
        if (info.captions.length >= 2) {
            return (
                <div>
                    {info.captions[0] + ', ' + info.captions[1] + ', '}
                    <span className="text-hyperlink-light underline decoration-hyperlink-light cursor-pointer">
                        {info.captions.length - 2} more
                    </span>
                </div>
            )
        } else {
            return (
                <div>
                    {info.captions.reduce(
                        (pev: string, cur: string) => pev + ' ' + cur,
                    )}
                </div>
            )
        }
    }

    return (
        <div className="bg-black px-[110px] py-10 flex justify-between relative">
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
                    <div className="text-[14px] font-light underline decoration-hyperlink-light text-hyperlink-light cursor-pointer">
                        {`(${info.ratings} ratings)`}
                    </div>
                    <div className="text-[14px] font-light">
                        {`${info.students} students`}
                    </div>
                </div>
                <div className="text-[14px] font-light">
                    Created by{' '}
                    {info.authors.map((author, index) => {
                        return (
                            <span key={index}>
                                <span className="text-hyperlink-light underline decoration-hyperlink-light cursor-pointer">
                                    {author}
                                </span>
                                {index !== info.authors.length - 1 && ', '}
                            </span>
                        )
                    })}
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
                        {getCaptions()}
                    </div>
                </div>
            </div>
            <Sidebar />
        </div>
    )
}
