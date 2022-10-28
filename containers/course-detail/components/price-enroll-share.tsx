import Button from '@/components/core/button'
import * as React from 'react'
import { faShareNodes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export interface IPriceEnrollShareProps {
    price: string
    className?: string
}

export default function PriceEnrollShare(props: IPriceEnrollShareProps) {
    return (
        <div className={`${props.className}`}>
            <div className="font-semibold text-[36px]">{props.price}</div>
            <div className="flex items-center justify-center space-x-4 mt-3 mb-5">
                <Button className="btn-primary w-full">
                    <div className="font-medium text-[20px]">Enroll</div>
                </Button>
                <FontAwesomeIcon
                    icon={faShareNodes}
                    className="text-[20px] text-black rounded-full bg-white py-[14px] px-[16px] border border-black"
                />
            </div>
        </div>
    )
}
