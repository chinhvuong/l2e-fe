import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import Button from '@/components/core/button'
import CourseListSwiper from '@/components/common/course-list-swiper'
import Router from 'next/router'
import VerticalCourseCard from '@/components/core/vertical-course-card'
import { useCourse } from '@/api/hooks/useCourse'
import Loading from '@/components/core/animate/loading'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { getLoginState } from '@/store/user/selectors'
import { ACCESS_TOKEN } from '@/constants/localStorage'
import { updateLoginState } from '@/store/user'

const HomePageContainer = () => {
    const isLogin = useAppSelector(getLoginState)
    const dispatch = useAppDispatch()
    const { useGetAllCourses } = useCourse()
    const { data, refetch } = useGetAllCourses({
        onError: () => {},
        onSuccess: () => {},
    })

    useEffect(() => {
        if (isLogin) {
            refetch()
        }
        if (!isLogin && localStorage.getItem(ACCESS_TOKEN)) {
            console.log('isLogin', localStorage.getItem(ACCESS_TOKEN))
            dispatch(updateLoginState(true))
        }
    }, [isLogin])

    const goToCreateCoursePage = () => {
        Router.push('/create-course')
    }

    const goToMyCoursesPage = () => {
        Router.push('/my-courses')
    }

    return (
        <div>
            <div className="bg-second h-[550px] flex justify-center items-center text-white space-x-10 px-14">
                <div className="w-[540px] space-y-7">
                    <div className="leading-snug font-bold text-5xl xl:text-4xl lg:text-3xl md:text-2xl sm:text-3xl">
                        <span className="text-primary">Studying</span> and
                        Getting{' '}
                        <span className="text-primary">Qualifications</span>{' '}
                        Online is now much easier
                    </div>
                    <div className="lg:text-sm md:text-xs">
                        Skilline is an interesting platform that will teach you
                        in more an interactive way and provide you
                        qualifications.
                    </div>
                    <div className="flex items-center space-x-[30px] under_xl:flex-col under_xl:space-x-[0px] under_xl:space-y-[20px] lg:text-sm md:text-xs">
                        <Button className="btn-primary">Join us now</Button>
                        <div className="flex items-center space-x-[20px] cursor-pointer">
                            <FontAwesomeIcon
                                icon={faPlay}
                                className="text-[#23BDEE] rounded-full bg-white py-[16px] px-[18px]"
                            />
                            <div className="hover:text-primary-hover">
                                Watch how it works
                            </div>
                        </div>
                    </div>
                </div>
                <img
                    src="/svgs/home.svg"
                    alt=""
                    className="max-w-full max-h-full xl:w-[450px] lg:w-[370px] md:w-[300px] sm:hidden"
                />
            </div>
            <img src="/svgs/curvedPart.svg" alt="" className="w-full" />
            {isLogin && (
                <>
                    {data?.data === undefined ? (
                        <div className="flex justify-center items-center h-20">
                            {!isLogin ? <div></div> : <Loading />}
                        </div>
                    ) : (
                        <div>
                            <div className="flex justify-center mt-12 mb-4">
                                <div className="2xl:w-[1135px] xl:w-[885px] lg:w-[635px] md:w-[485px] sm:w-[285px] mb-[10px]">
                                    <div className="font-bold text-[30px]">
                                        Popular courses
                                    </div>
                                </div>
                            </div>
                            {data.data.length < 5 ? (
                                <div className="flex justify-center">
                                    {data.data.map((item, index) => (
                                        <div className="w-[300px]" key={index}>
                                            <VerticalCourseCard
                                                key={item._id}
                                                data={item}
                                                className="mx-[8px]"
                                            />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <CourseListSwiper
                                    data={data.data}
                                    title="Short and sweet courses for you"
                                    className="mt-8"
                                />
                            )}
                        </div>
                    )}
                </>
            )}

            {/* <div className="flex justify-center mt-12 mb-4">
                <div className="2xl:w-[1135px] xl:w-[885px] lg:w-[635px] md:w-[485px] sm:w-[285px] mb-[10px]">
                    <div className="font-extrabold text-[41px]">
                        What to learn next?
                    </div>
                </div>
            </div>
            <CourseListSwiper
                data={dataCourses_preview_swiper}
                title="Students are viewing"
            />
            <CourseListSwiper
                data={dataCourses_preview_swiper}
                title="Short and sweet courses for you"
                className="mt-8"
            /> */}
        </div>
    )
}

export default HomePageContainer
