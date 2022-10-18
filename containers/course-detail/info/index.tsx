import Breadcrumb from '@/components/core/breadcrumb'
import RatingStar from '@/components/core/rating-star'
import Label from '@/components/core/label'
import * as React from 'react'
import { faExclamationCircle, faGlobe } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Sidebar from '../components/sidebar'
import { getCourseOverviewInfo } from '@/store/course/selectors'
import VideoPreview from '@/components/core/video-preview'
import PriceEnrollShare from '../components/price-enroll-share'
import { useAppSelector } from '@/hooks'

export default function CourseInfo() {
    const data = useAppSelector(getCourseOverviewInfo)

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
        <div className="bg-black flex justify-center" id="overview-section">
            <div className="2xl:w-[1250px] lg:w-[700px] px-8 under_lg:px-0 py-10 flex justify-between relative">
                <div className="w-[800px] under_lg:w-full text-white space-y-5">
                    <div className="under_lg:px-8">
                        <Breadcrumb data={breadcrumb} />
                    </div>
                    <VideoPreview
                        thumbnail={data.thumbnail}
                        className="2xl:hidden"
                        textSize="big"
                    />
                    <div className="under_lg:w-full text-white space-y-5 under_lg:px-8">
                        <div className="font-bold text-[35px] leading-[45px]">
                            {data.name}
                        </div>
                        <div className="text-[20px]">{data.overview}</div>
                        <div className="flex items-center flex-wrap">
                            <div className="flex items-center space-x-4 mr-4 my-2">
                                {data.isBestseller && (
                                    <Label name="Bestseller" />
                                )}
                                <Label name="IT" />
                                <RatingStar
                                    id={data._id}
                                    ratingScore={data.rating}
                                    className="mt-0.5"
                                />
                            </div>
                            <div className="flex items-center space-x-4 my-2">
                                <div className="text-[14px] font-light underline decoration-hyperlink-light text-hyperlink-light cursor-pointer">
                                    {`(${data.reviews.toLocaleString()} ratings)`}
                                </div>
                                <div className="text-[14px] font-light">
                                    {`${data.students.toLocaleString()} students`}
                                </div>
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
                        <PriceEnrollShare
                            price={data.price}
                            className="2xl:hidden"
                        />
                    </div>
                </div>
                <Sidebar />
            </div>
        </div>
    )
}
