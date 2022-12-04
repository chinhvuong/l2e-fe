import Button from '@/components/core/button'
import RichTextEditor from '@/components/core/rich-text-editor'
import Select from '@/components/core/select'
import Hyperlink from '@/containers/create-course/components/hyperlink'
import {
    faFileLines,
    faFilePowerpoint,
    faFileVideo,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'

export interface IMainContentProps {}

export default function MainContent() {
    const [contentType, setContentType] = useState<
        'video' | 'slide' | 'article' | null
    >(null)
    const [uploadedFile, setUploadedFile] = useState<File | null>(null)
    const [uploadedFileURL, setUploadedFileURL] = useState<string | null>(null)
    const [uploadedVideoDuration, setUploadedVideoDuration] = useState('')

    useEffect(() => {
        if (uploadedFileURL) {
            const audio = new Audio()
            audio.src = uploadedFileURL
            audio.onloadedmetadata = () => {
                getVideoDuration(audio.duration)
            }
        }

        // free memory when ever this component is unmounted
        return () => {
            uploadedFileURL && URL.revokeObjectURL(uploadedFileURL)
        }
    }, [uploadedFileURL])

    const getVideoDuration = (duration: number) => {
        const h = Math.floor(duration / 3600)
                .toString()
                .padStart(2, '0'),
            m = Math.floor((duration % 3600) / 60)
                .toString()
                .padStart(2, '0'),
            s = Math.floor(duration % 60)
                .toString()
                .padStart(2, '0')

        setUploadedVideoDuration(h + ':' + m + ':' + s)
    }

    const handleUploadFile = () => {
        const inputFile = document.createElement('input')
        inputFile.type = 'file'
        inputFile.accept = 'video/*'

        inputFile.click()

        inputFile.onchange = (e) => {
            const target = e.target as HTMLInputElement
            if (target.files && target.files[0]) {
                setUploadedFile(target.files[0])
                const objectUrl = URL.createObjectURL(target.files[0])
                setUploadedFileURL(objectUrl)

                setContentType('video')

                // const formData = new FormData()
                // formData.append('file', target.files[0])

                // uploadFile(formData)
            }
        }
    }

    const getContent = () => {
        if (!contentType) {
            return (
                <div className="space-y-5 py-5 border-t border-black">
                    <div className="text-sm text-center px-3">
                        Select the main type of content. Files and links can be
                        added as resources.{' '}
                        <Hyperlink>Learn about content types.</Hyperlink>
                    </div>
                    <div className="flex items-center justify-center space-x-7">
                        <div
                            className={`flex flex-col space-y-3 items-center w-[100px] text-center py-3 px-2 border border-black hover:border-primary hover:bg-primary hover:text-white rounded-[10px] cursor-pointer`}
                            onClick={() => handleUploadFile()}
                        >
                            <FontAwesomeIcon
                                icon={faFileVideo}
                                className="text-lg"
                            />
                            <div className="font-bold text-xs">Video</div>
                        </div>
                        <div
                            className={`flex flex-col space-y-3 items-center w-[100px] text-center py-3 px-2 border border-black hover:border-primary hover:bg-primary hover:text-white rounded-[10px] cursor-pointer`}
                            // onClick={() => setContentType('slide')}
                        >
                            <FontAwesomeIcon
                                icon={faFilePowerpoint}
                                className="text-lg"
                            />
                            <div className="font-bold text-xs">Slide</div>
                        </div>
                        <div
                            className={`flex flex-col space-y-3 items-center w-[100px] text-center py-3 px-2 border border-black hover:border-primary hover:bg-primary hover:text-white rounded-[10px] cursor-pointer`}
                            onClick={() => setContentType('article')}
                        >
                            <FontAwesomeIcon
                                icon={faFileLines}
                                className="text-lg"
                            />
                            <div className="font-bold text-xs">Article</div>
                        </div>
                    </div>
                </div>
            )
        }
        if (contentType === 'video') {
            return (
                <div className="px-10 py-5 border-t border-black">
                    <div className="flex justify-between">
                        <div className="flex items-start space-x-3">
                            <video
                                id="video-thumbnail"
                                width={120}
                                height={67.5}
                                src={uploadedFileURL ?? ''}
                            ></video>
                            <div>
                                <div className="font-bold">
                                    {uploadedFile?.name}
                                </div>
                                <div className="mb-5">
                                    {uploadedVideoDuration}
                                </div>
                            </div>
                        </div>
                        <div className="w-[140px]">
                            <Select
                                selectList={['As Instructor', 'As Student']}
                                placeholder="Preview"
                                selected=""
                            />
                        </div>
                    </div>
                    <div className="flex space-x-3 justify-end items-center mt-10">
                        <Button onClick={() => handleUploadFile()}>
                            <div>Change video</div>
                        </Button>
                        <Button
                            onClick={() => setContentType(null)}
                            className="btn-primary-outline"
                        >
                            <div>Cancel</div>
                        </Button>
                    </div>
                </div>
            )
        }
        if (contentType === 'article') {
            return (
                <div className="space-y-3 px-10 py-5 border-t border-black">
                    <RichTextEditor label="Article" />
                    <div className="flex space-x-3 justify-end items-center">
                        <Button>
                            <div>Save</div>
                        </Button>
                        <Button
                            className="btn-primary-outline"
                            onClick={() => setContentType(null)}
                        >
                            <div>Cancel</div>
                        </Button>
                    </div>
                </div>
            )
        }
    }

    return <>{getContent()}</>
}
