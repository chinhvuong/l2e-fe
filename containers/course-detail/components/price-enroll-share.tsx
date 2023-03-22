import Button from '@/components/core/button'
import { faShareNodes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Loading from '@/components/core/animate/loading'
import { useSelector } from 'react-redux'
import { getEnrollStatusState } from '@/store/course/selectors'
import EnrollBtn from './enroll-btn'
import Router from 'next/router'
export interface IPriceEnrollShareProps {
    price: number
    courseId?: number
    _id: string
}

export default function PriceEnrollShare(props: IPriceEnrollShareProps) {
    const isEnrolled = useSelector(getEnrollStatusState)

    return (
        <div>
            {false ? (
                <div className="flex justify-center items-center h-20">
                    <Loading />
                </div>
            ) : (
                <div>
                    <div className="font-semibold text-[36px]">
                        {props.price + ' USDT'}
                    </div>
                    <div className="flex items-center space-x-4 mt-3 mb-5">
                        {isEnrolled === true ? (
                            <Button
                                className="w-full flex items-center justify-center"
                                onClick={() =>
                                    Router.push(`/learn/${props._id}`)
                                }
                            >
                                <div className="font-medium text-[20px]">
                                    Learn
                                </div>
                            </Button>
                        ) : (
                            <EnrollBtn />
                        )}
                        <FontAwesomeIcon
                            icon={faShareNodes}
                            className="text-[20px] text-black rounded-full bg-white py-[14px] px-[16px] border border-black"
                        />
                    </div>
                </div>
            )}
        </div>
    )
}
