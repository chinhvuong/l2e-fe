import { FileAPI } from '@/api/api-path'
import useAPI from '@/api/hooks/useAPI'
import Loading from '@/components/core/animate/loading'
import Button from '@/components/core/button'
import VideoModal from '@/components/core/modal/video-modal'
import RichTextEditor from '@/components/core/rich-text-editor'
import Hyperlink from '@/containers/create-course/components/hyperlink'
import { useAppDispatch } from '@/hooks'
import { CurriculumLecture } from '@/store/course/curriculum/types'
import {
    faFileLines,
    faFilePowerpoint,
    faFileVideo,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import { useEffect, useState } from 'react'

export interface IMainContentProps {
    lectureDetail: CurriculumLecture
    updateCard: ActionCreatorWithPayload<CurriculumLecture, string>
}

export default function MainContent({
    lectureDetail,
    updateCard,
}: IMainContentProps) {
    const [contentType, setContentType] = useState<string | null>(
        lectureDetail.mediaType !== '' ? lectureDetail.mediaType : null,
    )
    const [contentName, setContentName] = useState<string | null>(
        lectureDetail.mediaName !== '' ? lectureDetail.mediaName : null,
    )
    const [uploadedFileURL, setUploadedFileURL] = useState<string | null>(
        lectureDetail.media !== '' ? lectureDetail.media : null,
    )
    const [uploadedFile, setUploadedFile] = useState<File | null>(null)
    const [uploadedVideoDuration, setUploadedVideoDuration] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [article, setArticle] = useState<string>('')
    const dispatch = useAppDispatch()

    const updateLectureMainContent = (url: string) => {
        const newDetail = { ...lectureDetail }
        newDetail.media = url
        newDetail.mediaName = contentName ?? ''
        newDetail.mediaType = 'video'
        newDetail.isLoading = false
        dispatch(updateCard(newDetail))
    }

    const removeLectureMainContent = () => {
        setContentType(null)
        const newDetail = { ...lectureDetail }
        newDetail.media = ''
        newDetail.mediaName = ''
        newDetail.mediaType = ''
        dispatch(updateCard(newDetail))
    }

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

    const { mutate: uploadFile, isLoading: isLoadingUploadFile } = useAPI.post(
        FileAPI.UPLOAD_SINGLE_FILE,
        {
            onError: () => {
                setContentType(null)
                setUploadedFileURL(null)
                updateLectureLoadingState(false)
            },
            onSuccess: (response) => {
                if (uploadedFile) {
                    setContentName(uploadedFile.name)
                    const objectUrl = URL.createObjectURL(uploadedFile)
                    setUploadedFileURL(objectUrl)

                    setContentType('video')
                }
                updateLectureMainContent(response.url)
            },
        },
        {
            'Content-Type': 'multipart/form-data',
            'Access-Control-Allow-Origin': '*',
        },
    )

    const updateLectureLoadingState = (value: boolean) => {
        const newDetail = { ...lectureDetail }
        newDetail.isLoading = value
        dispatch(updateCard(newDetail))
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

                const formData = new FormData()
                formData.append('file', target.files[0])

                updateLectureLoadingState(true)
                uploadFile(formData)
            }
        }
    }

    const handleUpdateArticle = (value: string) => {
        setArticle(value)
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
            if (!uploadedFileURL) {
                return
            }
            return (
                <div className="px-10 py-5 border-t border-black">
                    <div className="flex justify-between">
                        <div className="flex items-start space-x-3">
                            <div className="basis-1/2">
                                <VideoModal
                                    isShow={showModal}
                                    setIsShow={setShowModal}
                                    url={uploadedFileURL}
                                />
                            </div>
                            <div>
                                <div className="font-bold">{contentName}</div>
                                <div className="mb-5">
                                    {uploadedVideoDuration}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex space-x-3 justify-end items-center mt-10">
                        <Button onClick={() => handleUploadFile()}>
                            <div>Change video</div>
                        </Button>
                        <Button
                            onClick={() => removeLectureMainContent()}
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
                    <RichTextEditor
                        label="Article"
                        updateState={handleUpdateArticle}
                    />
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

    return (
        <>
            {isLoadingUploadFile ? (
                <div className="px-10 py-8 border-t border-black flex justify-center">
                    <Loading />
                </div>
            ) : (
                getContent()
            )}
        </>
    )
}
