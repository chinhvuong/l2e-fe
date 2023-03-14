import VerticalCourseCard from '@/components/core/vertical-course-card'
import React, { useEffect, useState } from 'react'
import {
    faChevronLeft,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CoursePreview } from '@/api/dto/course.dto'
export interface ICourseListProps {
    title?: string
    data: CoursePreview[]
    className?: string
}

export default function CourseListSwiper(props: ICourseListProps) {
    const [disableLeftSwiper, setDisableLeftSwiper] = useState(true)
    const [disableRightSwiper, setDisableRightSwiper] = useState(false)
    const [slidesToShow, setSlidesToShow] = useState(5)
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
            if (props.data.length - slidesToShow <= next) {
                setDisableLeftSwiper(false)
                setDisableRightSwiper(true)
            } else {
                setDisableRightSwiper(false)
            }
        },
    }
    useEffect(() => {
        if (window.innerWidth < 640) {
            setSlidesToShow(1)
        } else if (window.innerWidth < 768) {
            setSlidesToShow(2)
        } else if (window.innerWidth < 1024) {
            setSlidesToShow(3)
        } else if (window.innerWidth < 1280) {
            setSlidesToShow(4)
        } else {
            setSlidesToShow(5)
        }
    }, [])
    return (
        <div className={props.className}>
            <div className={`flex justify-center ${!props.title && 'hidden'}`}>
                <div className="2xl:w-[1135px] xl:w-[885px] lg:w-[635px] md:w-[485px] sm:w-[285px] mb-[10px]">
                    <div className="font-semibold text-[30px]">
                        {props.title}
                    </div>
                </div>
            </div>
            <div className="flex items-center flex-col">
                <Slider
                    {...settings}
                    className="2xl:max-w-[1150px] xl:max-w-[900px] lg:max-w-[650px] md:max-w-[500px] sm:max-w-[300px]"
                >
                    {props.data.map((course) => {
                        return (
                            <VerticalCourseCard
                                key={course._id}
                                data={course}
                                className="mx-[8px]"
                            />
                        )
                    })}
                </Slider>
            </div>
        </div>
    )
}
