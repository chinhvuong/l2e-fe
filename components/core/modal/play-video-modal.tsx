import React from 'react'
import ReactPlayer from 'react-player'

interface IPlayVideoModalProps {
    isShow: boolean
    setIsShow: React.Dispatch<React.SetStateAction<boolean>>
    url: string
    courseName?: string
}

export default function PlayVideoModal(props: IPlayVideoModalProps) {
    const { isShow, setIsShow, url, courseName } = props

    return (
        <>
            {isShow ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-neutral-800 outline-none focus:outline-none">
                                <div className="flex items-center justify-between pt-8 pb-5 px-10">
                                    <div>
                                        <div
                                            className={`${
                                                courseName
                                                    ? 'text-md text-divider'
                                                    : 'text-xl text-white'
                                            } font-semibold mb-1`}
                                        >
                                            {courseName
                                                ? 'Course Preview'
                                                : 'Video Preview'}
                                        </div>
                                        {courseName && (
                                            <div className="text-xl font-bold text-white">
                                                {courseName}
                                            </div>
                                        )}
                                    </div>
                                    <div
                                        className="absolute top-5 right-5 text-white cursor-pointer bg-gray-500 px-2 rounded-full"
                                        onClick={() => setIsShow(false)}
                                    >
                                        x
                                    </div>
                                </div>
                                <div className="relative pb-8 px-10 flex-auto">
                                    <ReactPlayer
                                        url={url}
                                        playing={true}
                                        controls={true}
                                        volume={1}
                                        height="50vh"
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
