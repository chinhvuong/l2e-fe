import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import Button from '@/components/core/button'
import CourseCard from '@/components/common/course-card'
import { dataCourses } from '@/data/data-courses'

const HomePageContainer = () => {
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
            <div className="flex justify-center space-x-7">
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
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default HomePageContainer
