import { CourseDetailPreview } from '@/api/dto/course.dto'
import Loading from '@/components/core/animate/loading'
import Button from '@/components/core/button'
import { getEnrollStatusState } from '@/store/course/selectors'
import { faShareNodes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Router from 'next/router'
import { useSelector } from 'react-redux'
import EnrollBtn from './enroll-btn'
import { useAccount } from 'wagmi'
export interface IPriceEnrollShareProps {
    data: CourseDetailPreview
}

export default function PriceEnrollShare({ data }: IPriceEnrollShareProps) {
    const isEnrolled = useSelector(getEnrollStatusState)
    const { address } = useAccount()
    const canEnroll = () => {
        if (
            String(address).toLowerCase() !==
                data.author.walletAddress.toLowerCase() ||
            String(address).toLowerCase() !== data.owner
        ) {
            return true
        } else {
            return false
        }
    }
    return (
        <div>
            {false ? (
                <div className="flex justify-center items-center h-20">
                    <Loading />
                </div>
            ) : (
                <div>
                    <div className="font-semibold text-[36px]">
                        {data.price + ' USDT'}
                    </div>
                    {canEnroll() && (
                        <div className="flex items-center space-x-4 mt-3 mb-5">
                            {isEnrolled === true ? (
                                <Button
                                    className="w-full flex items-center justify-center"
                                    onClick={() =>
                                        Router.push(`/learn/${data._id}`)
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
                    )}
                </div>
            )}
        </div>
    )
}
