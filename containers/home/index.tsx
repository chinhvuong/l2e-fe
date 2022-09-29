import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faPlay,
    faChevronLeft,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import Button from '@/components/core/button'
import { dataCourses } from '@/data/data-courses'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import CourseCard from '@/components/core/course-card'

const HomePageContainer = () => {
    // hide nextArrow using window.innerWidth
    // courseList component

    const [disableLeftSwiper, setDisableLeftSwiper] = useState(true)
    const [disableRightSwiper, setDisableRightSwiper] = useState(false)
    const PrevArrow = (props: any) => {
        const { onClick } = props
        return (
            <div
                className={`w-fit absolute top-[35px] lg:top-[32px] md:top-[41px] sm:top-[54px] left-[-15px] z-10 cursor-pointer ${
                    disableLeftSwiper ? 'hidden' : 'block'
                }`}
                onClick={onClick}
            >
                <FontAwesomeIcon
                    icon={faChevronLeft}
                    className="text-2xl bg-black text-white rounded-full border py-[12px] px-[15px]"
                />
            </div>
        )
    }
    const NextArrow = (props: any) => {
        const { onClick } = props
        return (
            <div
                className={`w-fit absolute top-[35px] lg:top-[32px] md:top-[41px] sm:top-[54px] right-[-15px] z-10 cursor-pointer ${
                    disableRightSwiper ? 'hidden' : 'block'
                }`}
                onClick={onClick}
            >
                <FontAwesomeIcon
                    icon={faChevronRight}
                    className="text-2xl bg-black text-white rounded-full border py-[12px] px-[15px]"
                />
            </div>
        )
    }
    const settings = {
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
        infinite: false,
        speed: 200,
        slidesToShow: 5,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 4,
                },
            },
        ],
        beforeChange: (current: number, next: number) => {
            if (next === 0) {
                setDisableLeftSwiper(true)
                setDisableRightSwiper(false)
            } else {
                setDisableLeftSwiper(false)
            }
            if (next === 100) {
                setDisableLeftSwiper(false)
                setDisableRightSwiper(true)
            } else {
                setDisableRightSwiper(false)
            }
            console.log('test', dataCourses.length)
            console.log('beforeChange', current, next)
        },
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
                    <div className="flex items-center space-x-[30px] under_lg:flex-col under_lg:space-x-[0px] under_lg:space-y-[20px] lg:text-sm md:text-xs">
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
            <div className="flex justify-center">
                <Slider
                    {...settings}
                    className="2xl:max-w-[1150px] xl:max-w-[900px] lg:max-w-[650px] md:max-w-[500px] sm:max-w-[300px]"
                >
                    {dataCourses.map((course) => {
                        return (
                            <CourseCard
                                key={course.thumbnail}
                                thumbnail={course.thumbnail}
                                title={course.title}
                                authors={course.authors}
                                rating={course.rating}
                                students={course.students}
                                price={course.price}
                                isBestseller={course.isBestseller}
                                category={course.category}
                                className="mx-[8px]"
                            />
                        )
                    })}
                </Slider>
            </div>
        </div>
    )
}

export default HomePageContainer
