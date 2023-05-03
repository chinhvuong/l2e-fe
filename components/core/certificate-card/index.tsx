import Label from '@/components/core/label'
import { Certificate } from '@/store/certification/types'
import RatingStar from '../rating-star'

export interface ICertificateCardProps {
    data: Certificate
    className?: string
    showDetail?: boolean
    showStatus?: boolean
}

export default function CertificateCard({
    data,
    className,
    showDetail = true,
    showStatus = false,
}: ICertificateCardProps) {
    return (
        <div
            className={`flex w-full space-x-5 cursor-pointer hover:bg-gray-300 py-6 ${className}`}
        >
            <img
                src={
                    'https://marketplace.canva.com/EAFIEvneNCM/1/0/1600w/canva-golden-elegant-certificate-of-appreciation-0bN-aLORS9U.jpg'
                }
                alt=""
                className="w-[25%] min-w-[170px]"
            />
            {/* <div className="space-y-3">
                <div>
                    <div className="font-semibold text-xl line-clamp-2">
                        {data.name}
                    </div>
                </div>
                {showDetail && (
                    <>
                        <RatingStar
                            id={data._id}
                            ratingScore={data.rating}
                            ratings={data.ratingCount.toString()}
                        />
                        <div className="font-bold text-xl">
                            {data.price} USDT
                        </div>
                    </>
                )}
                <div className="flex space-x-3">
                    {showStatus && (
                        <>
                            <Label
                                name={
                                    data.approved ? 'Approved' : 'Not Approved'
                                }
                                color={data.approved ? '#22C55E' : '#E11D48'}
                            />
                            <Label
                                name={
                                    data.approved && data.courseId
                                        ? 'Minted'
                                        : 'Not Minted'
                                }
                                color={
                                    data.approved && data.courseId
                                        ? '#22C55E'
                                        : '#E11D48'
                                }
                            />
                        </>
                    )}
                    <Label
                        name={data.category.name}
                        color={data.category.color}
                    />
                </div>
            </div> */}
        </div>
    )
}
