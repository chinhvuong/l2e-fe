import { UserAPI } from '@/api/api-path'
import useAPI from '@/api/hooks/useAPI'
import CourseListSwiper from '@/components/common/course-list-swiper'
import LoadingScreen from '@/components/core/animate/loading-screen'
import Button from '@/components/core/button'
import WelcomeBackModal from '@/components/core/modal/welcome-back-modal'
import VerticalCourseCard from '@/components/core/vertical-course-card'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { updateGlobalLoadingState } from '@/store/user'
import { getClaimState } from '@/store/user/selectors'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export interface StaticCourseListProps {
    courseList: any
}
const HomePageContainer = (props: StaticCourseListProps) => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(updateGlobalLoadingState(router.isFallback))
    }, [router.isFallback])
    const isClaim = useAppSelector(getClaimState)
    const getCourseListUI = () => {
        if (!props.courseList) {
            return <></>
        }
        return props.courseList.length < 5 ? (
            <>
                <div className="flex justify-center mt-12 mb-6">
                    <div className="2xl:w-[1135px] xl:w-[885px] lg:w-[635px] md:w-[485px] sm:w-[285px] mb-[10px]">
                        <div className="font-bold text-[30px]">
                            Popular courses
                        </div>
                    </div>
                </div>
                <div className="flex justify-center">
                    {props.courseList.map((item: any, index: number) => (
                        <div className="w-[300px]" key={index}>
                            <VerticalCourseCard
                                key={item._id}
                                data={item}
                                className="mx-[8px]"
                            />
                        </div>
                    ))}
                </div>
            </>
        ) : (
            <CourseListSwiper
                data={props.courseList}
                title="Popular courses"
                className="mt-8"
            />
        )
    }

    return (
        <div>
            <WelcomeBackModal isShow={isClaim} />
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
            <div>{getCourseListUI()}</div>
        </div>
    )
}

export default HomePageContainer
