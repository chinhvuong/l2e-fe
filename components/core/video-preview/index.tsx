import React, { HTMLAttributes } from 'react'
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
    return (
        <div {...rest} className={`relative w-full video-preview ${className}`}>
            {video === null ? (
                <img
                    src={'/svgs/thumbnails/thumbnail_1.svg'}
                    alt=""
                    className="w-full"
                />
            ) : (
                <>
                    <video
                        id="video-thumbnail"
                        src={video}
                        className="w-full"
                    ></video>
                </>
            )}
            <div className="flex flex-col items-center justify-between sm:justify-center absolute z-30 w-full h-full top-[0px] py-2">
                <div
                    className={`font-semibold text-xs
                    text-white text-transparent sm:hidden`}
                >
                    Preview
                </div>
                <div className="flex items-center space-x-[20px] cursor-pointer">
                    <FontAwesomeIcon
                        icon={faPlay}
                        className="text-[24px] text-black rounded-full bg-white py-[20px] px-[23px]"
                    />
                </div>
                <div
                    className={`font-semibold text-xs text-transparent sm:hidden`}
                >
                    Preview
                </div>
            </div>
        </div>
    )
}
