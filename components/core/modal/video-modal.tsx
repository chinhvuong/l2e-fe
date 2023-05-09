import React from 'react'
import VideoPreview from '../video-preview'
import PlayVideoModal from './play-video-modal'

interface IVideoModalProps {
    isShow: boolean
    setIsShow: React.Dispatch<React.SetStateAction<boolean>>
    url: string
    className?: string
    showPreview?: boolean
    courseName?: string
}

export default function VideoModal(props: IVideoModalProps) {
    const {
        isShow,
        setIsShow,
        url,
        className,
        showPreview = true,
        courseName,
    } = props

    return (
        <>
            {showPreview && (
                <VideoPreview
                    video={url}
                    onClick={() => setIsShow(!isShow)}
                    className={className}
                />
            )}
            <PlayVideoModal
                isShow={isShow}
                setIsShow={setIsShow}
                url={url}
                courseName={courseName}
            />
        </>
    )
}
