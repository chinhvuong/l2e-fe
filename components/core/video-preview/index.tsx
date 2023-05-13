import React, { HTMLAttributes, useState } from 'react'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './style.scss'

export interface IVideoPreviewProps {
    video: string
    className?: string
}

export default function VideoPreview({
    video,
    className,
    ...rest
}: IVideoPreviewProps & HTMLAttributes<HTMLDivElement>) {
    const [isLoading, setIsLoading] = useState(true)

    return (
        <div {...rest} className={`relative w-full video-preview ${className}`}>
            <div
                className={`animate-pulse h-2 bg-slate-700 w-full h-[200px] ${
                    !isLoading && 'hidden'
                }`}
            ></div>
            <video
                id="video-thumbnail"
                src={video}
                className={`w-full ${isLoading && 'hidden'}`}
                onCanPlay={() => setIsLoading(false)}
            />
            <div
                className={`flex flex-col items-center justify-center sm:justify-center ${
                    isLoading ? 'hidden' : 'absolute'
                } z-30 w-full h-full top-[0px] py-2`}
            >
                <div className="flex items-center space-x-[20px] cursor-pointer">
                    <FontAwesomeIcon
                        icon={faPlay}
                        className="text-[24px] text-black rounded-full bg-white py-[20px] px-[23px]"
                    />
                </div>
            </div>
        </div>
    )
}
