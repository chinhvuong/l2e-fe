import useAPI from '@/api/hooks/useAPI'
import Button from '@/components/core/button'
import RichTextEditor from '@/components/core/rich-text-editor'
import Hyperlink from '@/containers/create-course/components/hyperlink'
import {
    faFileLines,
    faFilePowerpoint,
    faFileVideo,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { noop } from 'lodash'
import { useEffect, useState } from 'react'
import { FileAPI } from '@/api/api-path'
import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import { CurriculumLecture } from '@/store/course/curriculum/types'
import { useAppDispatch } from '@/hooks'
import { updateCurriculumLectureMainContent } from '@/store/course/curriculum'
import Loading from '@/components/core/animate/loading'
import { updateCanSaveCourseState } from '@/store/course'

export interface IMainContentProps {
    lectureDetail: CurriculumLecture
}

export default function MainContent({ lectureDetail }: IMainContentProps) {
    const [contentType, setContentType] = useState<string | null>(
        lectureDetail.mediaType !== '' ? lectureDetail.mediaType : null,
    )
    const [contentName, setContentName] = useState<string | null>(
        lectureDetail.mediaName !== '' ? lectureDetail.mediaName : null,
    )
    const [uploadedFileURL, setUploadedFileURL] = useState<string | null>(
        lectureDetail.media !== '' ? lectureDetail.media : null,
    )
    const [uploadedVideoDuration, setUploadedVideoDuration] = useState('')
    const [article, setArticle] = useState<string>('')
    const dispatch = useAppDispatch()

    const updateLectureMainContent = (url: string) => {
        const newDetail = { ...lectureDetail }
        newDetail.media = url
        newDetail.mediaName = contentName ?? ''
        newDetail.mediaType = 'video'
        dispatch(updateCurriculumLectureMainContent(newDetail))
        setTimeout(() => dispatch(updateCanSaveCourseState(true)), 1000)
    }

    const removeLectureMainContent = () => {
        setContentType(null)
        const newDetail = { ...lectureDetail }
        newDetail.media = ''
        newDetail.mediaName = ''
        newDetail.mediaType = ''
        dispatch(updateCurriculumLectureMainContent(newDetail))
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
            onError: noop,
            onSuccess: (response) => {
                updateLectureMainContent(response.url)
            },
        },
        {
            'Content-Type': 'multipart/form-data',
            'Access-Control-Allow-Origin': '*',
        },
    )

    const handleUploadFile = () => {
        const inputFile = document.createElement('input')
        inputFile.type = 'file'
        inputFile.accept = 'video/*'

        inputFile.click()

        inputFile.onchange = (e) => {
            const target = e.target as HTMLInputElement
            if (target.files && target.files[0]) {
                setContentName(target.files[0].name)
                const objectUrl = URL.createObjectURL(target.files[0])
                setUploadedFileURL(objectUrl)

                setContentType('video')

                const formData = new FormData()
                formData.append('file', target.files[0])

                dispatch(updateCanSaveCourseState(false))
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
