import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import Button from '@/components/core/button'
import { dataCourses_preview_swiper } from '@/data/course-preview'
import CourseListSwiper from '@/components/common/course-list-swiper'
import Router from 'next/router'
import { useAuth } from '@/api/hooks/useAuth'

const HomePageContainer = () => {
    const goToCreateCoursePage = () => {
        Router.push('/create-course')
    }

    const { useLogin } = useAuth()
    const { mutate: login } = useLogin({
        onError: () => {},
        onSuccess: () => {},
    })

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
            <div className="flex justify-center text-white mt-10">
                <Button onClick={() => goToCreateCoursePage()}>
                    Create course
                </Button>
                <Button
                    onClick={() =>
                        login({
                            walletAddress:
                                '0x6AB0Cc7184F27b7ABbA97de7d23B26665a4f7d5C',
                            signature:
                                '0x3282ea2682c68be7183248f61298b9993962ca41aadec42e0bb1944057ed66750a53aad0b8bf4923671d89a9d40b70e31244e448b35f1dd0c4d88106772275011b',
                        })
                    }
                >
                    Login
                </Button>
            </div>

            <div className="flex justify-center mt-12 mb-4">
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
            />
        </div>
    )
}

export default HomePageContainer
