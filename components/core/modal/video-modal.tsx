import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import VideoPreview from '../video-preview'

interface IVideoModalProps {
    isShow: boolean
    setIsShow: React.Dispatch<React.SetStateAction<boolean>>
    url: string
    className?: string
    showPreview?: boolean
}

export default function VideoModal(props: IVideoModalProps) {
    const { isShow, setIsShow, url, className, showPreview = true } = props

    const [showModal, setShowModal] = useState(isShow)

    useEffect(() => {
        setShowModal(isShow)
    }, [isShow])

    const handleShowModal = (value: boolean) => {
        setShowModal(value)
        setIsShow(value)
    }

    return (
        <>
            {showPreview && (
                <VideoPreview
                    video={url}
                    onClick={() => setShowModal(!showModal)}
                    className={className}
                />
            )}
            {showModal ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-neutral-800 outline-none focus:outline-none">
                                <div className="flex items-center justify-between p-5">
                                    <div>
                                        <div className="text-md font-semibold text-divider mb-1">
                                            Course Preview
                                        </div>
                                        <div className="text-xl font-bold text-white">
                                            Crash Course: Build a Full-Stack Web
                                            App in a Weekend!
                                        </div>
                                    </div>
                                    <div
                                        className="absolute top-5 right-5 text-white cursor-pointer"
                                        onClick={() => handleShowModal(false)}
                                    >
                                        ✕
                                    </div>
                                </div>
                                <div className="relative p-6 flex-auto">
                                    <ReactPlayer
                                        url={url}
                                        playing={true}
                                        controls={true}
                                        volume={1}
                                        width="50vw"
                                        height="50vh"
                                        onReady={() => console.log('ready now')}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-700 bg-opacity-50 fixed inset-0 z-40"></div>
                </>
            ) : null}
        </>
    )
}