import * as React from 'react'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './style.scss'

export interface IVideoPreviewProps {
    thumbnail: string
    className?: string
    textSize?: 'big' | 'small'
}

export default function VideoPreview(props: IVideoPreviewProps) {
    return (
        <div className={`relative w-full video-preview ${props.className}`}>
            <img src={props.thumbnail} alt="" className="w-full" />
            <div className="flex flex-col items-center justify-between absolute z-30 w-full h-full top-[0px] py-2">
                <div
                    className={`font-semibold ${
                        props.textSize === 'big' ? 'text-xl' : 'text-xs'
                    } text-white text-transparent`}
                >
                    Preview this course
                </div>
                <div className="flex items-center space-x-[20px] cursor-pointer">
                    {props.textSize === 'small' ? (
                        <FontAwesomeIcon
                            icon={faPlay}
                            className="text-[24px] text-black rounded-full bg-white py-[20px] px-[23px]"
                        />
                    ) : (
                        <FontAwesomeIcon
                            icon={faPlay}
                            className="text-[40px] text-black rounded-full bg-white py-[25px] px-[30px]"
                        />
                    )}
                </div>
                <div
                    className={`font-semibold ${
                        props.textSize === 'big' ? 'text-xl' : 'text-xs'
                    } text-white`}
                >
                    Preview this course
                </div>
            </div>
        </div>
    )
}
