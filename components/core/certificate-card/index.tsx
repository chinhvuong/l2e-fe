import Label from '@/components/core/label'
import { Certificate } from '@/store/certification/types'

export interface ICertificateCardProps {
    data: Certificate
    className?: string
}

export default function CertificateCard({
    data,
    className,
}: ICertificateCardProps) {
    const enum CertificateStatus {
        ON_CHAIN = 'On Chain',
        OFF_CHAIN = 'Off Chain',
        MINTING = 'Minting',
    }

    const enum CertificateStatusColor {
        ON_CHAIN = '#4ADE80',
        OFF_CHAIN = '#E11D48',
        MINTING = '#9CA3AF',
    }

    const getCertificateStatusLabel = (status: string): string => {
        switch (status) {
            case 'ON_CHAIN':
                return CertificateStatus.ON_CHAIN
            case 'OFF_CHAIN':
                return CertificateStatus.OFF_CHAIN
            case 'MINTING':
                return CertificateStatus.MINTING
            default:
                return ''
        }
    }

    const getCertificateStatusLabelColor = (status: string): string => {
        switch (status) {
            case 'ON_CHAIN':
                return CertificateStatusColor.ON_CHAIN
            case 'OFF_CHAIN':
                return CertificateStatusColor.OFF_CHAIN
            case 'MINTING':
                return CertificateStatusColor.MINTING
            default:
                return ''
        }
    }

    return (
        <div
            className={`flex w-full space-x-5 cursor-pointer hover:bg-gray-300 p-5 ${className}`}
        >
            <img
                src={
                    data.image ??
                    'https://marketplace.canva.com/EAFIEvneNCM/1/0/1600w/canva-golden-elegant-certificate-of-appreciation-0bN-aLORS9U.jpg'
                }
                alt=""
                className="under_xl:w-[120px] h-fit w-[25%]"
            />
            <div className="space-y-3">
                <div className="font-semibold text-xl line-clamp-2">
                    {data.course.name}
                </div>
                <div className="space-y-1">
                    <div>
                        <span>Graduation day: </span>
                        {new Date(data.createdAt).toLocaleDateString('vi-VN')}
                    </div>
                    <div>
                        <span>Final Test score: </span>
                        {`${Math.ceil(data.finalGrade)}/100`}
                    </div>
                    <div>
                        <span>Level: </span>
                        {data.graduation}
                    </div>
                </div>
                <div className="flex space-x-3">
                    <Label
                        name={getCertificateStatusLabel(data.status)}
                        color={getCertificateStatusLabelColor(data.status)}
                    />
                </div>
            </div>
        </div>
    )
}
