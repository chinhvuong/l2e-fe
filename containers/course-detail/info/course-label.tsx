import Button from '@/components/core/button'
import Label from '@/components/core/label'
import RatingStar from '@/components/core/rating-star'
import { useAppSelector } from '@/hooks'
import { getEnrollStatusState } from '@/store/course/selectors'
import { faShareNodes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Router from 'next/router'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import EnrollBtn from '../components/enroll-btn'
import { useCourseDetailContext } from '../course-detail-context'

export interface ICourseLabelProps {}

export default function CourseLabel() {
    const [scrollY, setScrollY] = useState(0)
    const { data } = useCourseDetailContext()
    const isEnroll = useAppSelector(getEnrollStatusState)
    const { address } = useAccount()
    const canEnroll = () => {
        if (data) {
            if (
                String(address).toLowerCase() !==
                    data.author.walletAddress.toLowerCase() &&
                String(address).toLowerCase() !== data.owner.toLowerCase() &&
                isEnroll === false
            ) {
                return true
            } else {
                return false
            }
        }
    }
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

    if (!data) {
        return <></>
    }
    console.log(canEnroll())
    return (
        <div
            className={`h-[80px] w-full bg-black z-20 py-3 px-[30px] 2xl:-top-1 under_2xl:bottom-0 under_2xl:fixed ${
                scrollY <= 600 ? 'hidden' : 'sticky'
            }`}
        >
            <div className="flex items-center justify-between">
                <div className="space-y-1 under_xl:w-[50%]">
                    <div className="font-bold text-white text-lg under_xl:text-base line-clamp-1 under_xl:line-clamp-2 under_xl:mr-5">
                        {data.name}
                    </div>
                    <div className="flex items-center space-x-4">
                        {/* <div className="under_xl:hidden">
                            {data.isBestseller && <Label name="Bestseller" />}
                        </div> */}
                        <div className="under_xl:hidden flex items-center space-x-5">
                            <div>
                                <Label
                                    name={data.category.name}
                                    color={data.category.color}
                                />
                            </div>
                            <RatingStar
                                id={data._id}
                                ratingScore={
                                    data.rating === null ? 0 : data.rating
                                }
                            />
                            {data.ratingCount && (
                                <div className="text-[14px] font-light underline underline-offset-4 decoration-hyperlink-light text-hyperlink-light cursor-pointer under_xl:mx-3">
                                    {`(${data.ratingCount} ${
                                        data.ratingCount < 2
                                            ? 'rating'
                                            : 'ratings'
                                    })`}
                                </div>
                            )}
                            {data.students && (
                                <div className="text-[14px] font-light text-white">
                                    {`(${data.students} ${
                                        data.students < 2
                                            ? 'student'
                                            : 'students'
                                    })`}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="items-center space-x-3 hidden under_2xl:flex">
                    <div className="font-semibold text-2xl under_xl:text-base text-white">
                        {data.price} USDT
                    </div>
                    {canEnroll() === false ? (
                        <Button
                            className="w-full flex items-center justify-center"
                            onClick={() => Router.push(`/learn/${data._id}`)}
                        >
                            <div className="font-medium text-[20px]">Learn</div>
                        </Button>
                    ) : (
                        <EnrollBtn />
                    )}
                    <FontAwesomeIcon
                        icon={faShareNodes}
                        className="text-[20px] rounded-full bg-white py-[14px] px-[16px] border border-black"
                    />
                </div>
            </div>
        </div>
    )
}
