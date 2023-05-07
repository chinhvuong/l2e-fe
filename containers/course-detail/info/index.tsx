import { LearnerAPI } from '@/api/api-path'
import useAPI from '@/api/hooks/useAPI'
import Label from '@/components/core/label'
import VideoModal from '@/components/core/modal/video-modal'
import RatingStar from '@/components/core/rating-star'
import { useAppDispatch } from '@/hooks'
import { updateEnrollStatus, updateLoadingState } from '@/store/course'
import { getLoginState } from '@/store/user/selectors'
import { faExclamationCircle, faGlobe } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { noop } from 'lodash'
import Router from 'next/router'
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

    const { mutate: checkEnrollState, isLoading: isLoadingCheckEnrollState } =
        useAPI.getMutation(LearnerAPI.CHECK_ENROLL + data?._id ?? '', {
            onError: noop,
            onSuccess(response) {
                dispatch(updateEnrollStatus(response.enroll))
            },
        })

    const getLastUpdated = () => {
        return data
            ? `Last updated ${
                  new Date(data.updatedAt).getMonth() + 1
              }/${new Date(data.updatedAt).getFullYear()}`
            : ''
    }

    const goToUserDetailPage = () => {
        dispatch(updateLoadingState(true))
        Router.push('/user/' + data?.author._id)
    }

    useEffect(() => {
        if (data && data._id && loginState) {
            checkEnrollState({})
        }
        if (data) {
            const courseCategory = {
                name: data?.category?.name,
                color: data?.category?.color,
            }
            setCategory(courseCategory)
        }
    }, [loginState, data])

    return (
        <div className="bg-black flex justify-center" id="overview-section">
            <div className="2xl:w-[1250px] lg:w-[700px] px-8 under_lg:px-0 py-10 flex justify-between relative">
                {data ? (
                    <div className="w-[820px] under_lg:w-full text-white">
                        <div className="2xl:hidden">
                            {data.promotionalVideo && (
                                <VideoModal
                                    isShow={showModal}
                                    setIsShow={setShowModal}
                                    url={data.promotionalVideo}
                                    courseName={data.name}
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
                                {(data.ratingCount !== null ||
                                    data.students !== null) && (
                                    <div className="flex items-center space-x-4 my-2">
                                        {data.ratingCount !== null && (
                                            <div className="text-[14px] font-light underline underline-offset-4 decoration-hyperlink-light text-hyperlink-light cursor-pointer">
                                                {`(${data.ratingCount} ${
                                                    data.ratingCount < 2
                                                        ? 'rating'
                                                        : 'ratings'
                                                })`}
                                            </div>
                                        )}
                                        {data.students !== null && (
                                            <div className="text-[14px] font-light">
                                                {`${data.students} ${
                                                    data.students < 2
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
                                <span
                                    className="text-hyperlink-light underline underline-offset-4 decoration-hyperlink-light cursor-pointer"
                                    onClick={() => goToUserDetailPage()}
                                >
                                    {data?.author?.name ?? 'Anonymous'}
                                </span>
                            </div>
                            <div className="flex text-[14px] font-light space-x-6">
                                <div className="flex items-center space-x-2">
                                    <FontAwesomeIcon
                                        icon={faExclamationCircle}
                                    />
                                    <div>{getLastUpdated()}</div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <FontAwesomeIcon icon={faGlobe} />
                                    <div>
                                        {data.language === 'en'
                                            ? 'English'
                                            : 'Tiếng Việt'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="w-[820px] under_lg:w-full text-white">
                        <div className="animate-pulse flex space-x-4 w-[90%] py-6">
                            <div className="flex-1 space-y-6">
                                <div className="h-2 bg-slate-700 rounded w-full"></div>
                                <div className="h-2 bg-slate-700 rounded w-2/3"></div>
                                <div className="h-2 bg-slate-700 rounded w-1/2"></div>
                                <div className="h-2 bg-slate-700 rounded w-1/3"></div>
                                <div className="h-2 bg-slate-700 rounded w-1/4"></div>
                                <div className="h-2 bg-slate-700 rounded w-2/3"></div>
                                <div className="h-2 bg-slate-700 rounded w-1/2"></div>
                                <div className="h-2 bg-slate-700 rounded w-2/5"></div>
                                <div className="h-2 bg-slate-700 rounded w-1/4"></div>
                            </div>
                        </div>
                    </div>
                )}
                <div
                    className={`under_2xl:hidden bg-white z-20 h-fit drop-shadow-xl ${
                        scrollY > 600 ? 'hidden' : 'absolute right-0'
                    }`}
                >
                    <Sidebar />
                </div>
            </div>
        </div>
    )
}
