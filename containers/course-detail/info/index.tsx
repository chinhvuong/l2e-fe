import { LearnerAPI } from '@/api/api-path'
import { callAPI } from '@/api/axios-client'
import Breadcrumb from '@/components/core/breadcrumb'
import Label from '@/components/core/label'
import VideoModal from '@/components/core/modal/video-modal'
import RatingStar from '@/components/core/rating-star'
import Hyperlink from '@/containers/create-course/components/hyperlink'
import { useAppDispatch } from '@/hooks'
import { updateEnrollStatus } from '@/store/course'
import { getLoginState } from '@/store/user/selectors'
import { faExclamationCircle, faGlobe } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Sidebar from '../components/sidebar'
import { useCourseDetailContext } from '../course-detail-context'

type Category = {
    name: string
    color: string
}

export default function CourseInfo() {
    const { data } = useCourseDetailContext()
    const [category, setCategory] = useState<Category | null>(null)
    const loginState = useSelector(getLoginState)
    const [showModal, setShowModal] = useState(false)
    const dispatch = useAppDispatch()
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
    useEffect(() => {
        const f = async () => {
            try {
                const isEnr = await callAPI(
                    'get',
                    LearnerAPI.CHECK_ENROLL + data._id,
                    {},
                )
                dispatch(updateEnrollStatus(isEnr.enroll))
            } catch (error) {
                console.log('🚀 ~ file: index.tsx:41 ~ f ~ error', error)
            }
        }
        if (data._id) {
            f()
        }
    }, [loginState, data._id])

    const getLastUpdated = () => {
        return `Last updated ${new Date(data.updatedAt).getMonth()}/${new Date(
            data.updatedAt,
        ).getFullYear()}`
    }

    useEffect(() => {
        if (data) {
            const courseCategory = {
                name: data?.category?.name,
                color: data?.category?.color,
            }
            setCategory(courseCategory)
        }
    }, [data])

    return (
        <div className="bg-black flex justify-center" id="overview-section">
            <div className="2xl:w-[1250px] lg:w-[700px] px-8 under_lg:px-0 py-10 flex justify-between relative">
                <div className="w-[800px] under_lg:w-full text-white space-y-5">
                    <div className="under_lg:px-8">
                        <Breadcrumb data={breadcrumb} />
                    </div>
                    <div className="2xl:hidden">
                        {data.promotionalVideo && (
                            <VideoModal
                                isShow={showModal}
                                setIsShow={setShowModal}
                                url={data.promotionalVideo}
                            />
                        )}
                    </div>
                    <div className="under_lg:w-full text-white space-y-5 under_lg:px-8">
                        <div className="font-bold text-[35px] leading-[45px]">
                            {data.name}
                        </div>
                        <div className="text-[20px]">{data.overview}</div>
                        <div className="flex items-center flex-wrap">
                            <div className="flex items-center space-x-4 mr-4 my-2">
                                {/* {data.isBestseller && (
                                    <Label name="Bestseller" />
                                )} */}
                                {category && (
                                    <Label
                                        name={category.name}
                                        color={category.color}
                                    />
                                )}
                                {data.rating !== null && (
                                    <RatingStar
                                        id={data._id}
                                        ratingScore={data.rating}
                                        ratings={'0'}
                                        hideRating
                                        className="mt-0.5"
                                    />
                                )}
                            </div>
                            {(data.reviews !== null ||
                                data.students !== null) && (
                                <div className="flex items-center space-x-4 my-2">
                                    {data.reviews !== null && (
                                        <div className="text-[14px] font-light underline decoration-hyperlink-light text-hyperlink-light cursor-pointer">
                                            {`(${data.reviews} ${
                                                data.reviews === 0
                                                    ? 'rating'
                                                    : 'ratings'
                                            })`}
                                        </div>
                                    )}
                                    {data.students !== null && (
                                        <div className="text-[14px] font-light">
                                            {`${data.students} ${
                                                data.students === 0
                                                    ? 'student'
                                                    : 'students'
                                            }`}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                        <div className="text-[14px] font-light">
                            Created by{' '}
                            <Hyperlink>
                                {data?.author?.name ?? 'Anonymous'}
                            </Hyperlink>
                            {/* <span className="text-hyperlink-light underline decoration-hyperlink-light cursor-pointer">
                                {data.owner}
                            </span> */}
                        </div>
                        <div className="flex text-[14px] font-light space-x-6">
                            <div className="flex items-center space-x-2">
                                <FontAwesomeIcon icon={faExclamationCircle} />
                                <div>{getLastUpdated()}</div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <FontAwesomeIcon icon={faGlobe} />
                                <div>{data.language}</div>
                            </div>
                        </div>
                        {/* <PriceEnrollShare
                            price={data.price}
                            className="2xl:hidden"
                            _id={data._id}
                            courseId={data.courseId}

                        /> */}
                    </div>
                </div>
                <Sidebar />
            </div>
        </div>
    )
}
