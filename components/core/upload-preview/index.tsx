import { FileAPI } from '@/api/api-path'
import { UploadOneFileResponse } from '@/api/dto/course.dto'
import useAPI from '@/api/hooks/useAPI'
import { useAppDispatch } from '@/hooks'
import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import { ReactNode, ReactText, useEffect, useState } from 'react'
import Loading from '../animate/loading'
import Button from '../button'
import VideoModal from '../modal/video-modal'

export interface IUploadPreviewProps {
    label: string
    type: 'image' | 'video'
    children: ReactNode | ReactText
    defaultPreview: string
    setFileLink?: Function
    imgClassName?: string
    childrenClassName?: string
    updateLoadingState?: ActionCreatorWithPayload<boolean, string>
}

export default function UploadPreview({
    label,
    type,
    children,
    defaultPreview,
    setFileLink,
    imgClassName,
    childrenClassName,
    updateLoadingState,
}: IUploadPreviewProps) {
    const [uploadedFile, setUploadedFile] = useState<File | null>(null)
    const [uploadedFileURL, setUploadedFileURL] = useState(defaultPreview)
    const [showModal, setShowModal] = useState(false)
    const dispatch = useAppDispatch()

    const { mutate: uploadFile, isLoading } = useAPI.post(
        FileAPI.UPLOAD_SINGLE_FILE,
        {
            onError: (err) => {
                setUploadedFile(null)
                setUploadedFileURL(defaultPreview)
                updateLoadingState && dispatch(updateLoadingState(false))
            },
            onSuccess: (response: UploadOneFileResponse) => {
                setFileLink && setFileLink(response.url)
                updateLoadingState && dispatch(updateLoadingState(false))
            },
        },
        {
            'Content-Type': 'multipart/form-data',
            'Access-Control-Allow-Origin': '*',
        },
    )

    useEffect(() => {
        if (!uploadedFile) {
            return
        }
        const objectUrl = URL.createObjectURL(uploadedFile)
        setUploadedFileURL(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [uploadedFile])

    const handleUploadFile = () => {
        const inputFile = document.createElement('input')
        inputFile.type = 'file'
        inputFile.accept = type === 'image' ? 'image/*' : 'video/*'

        inputFile.click()

        inputFile.onchange = (e) => {
            const target = e.target as HTMLInputElement
            if (target.files && target.files[0]) {
                setUploadedFile(target.files[0])
                const formData = new FormData()
                formData.append('file', target.files[0])

                updateLoadingState && dispatch(updateLoadingState(true))
                uploadFile(formData)
            }
        }
    }

    return (
        <div className="space-y-3">
            <div className="font-bold ml-[25px]">{label}</div>
            <div className="flex">
                <div className={`basis-1/2 ${imgClassName}`}>
                    {isLoading ? (
                        <div className="flex justify-center items-center h-full">
                            <Loading />
                        </div>
                    ) : (
                        <>
                            {type === 'image' && (
                                <img
                                    src={uploadedFileURL}
                                    alt="Course image"
                                    className="w-full"
                                />
                            )}
                            {type === 'video' &&
                                (uploadedFileURL ===
                                '/images/placeholder.jpeg' ? (
                                    <img
                                        src={uploadedFileURL}
                                        alt="Course image"
                                        className="w-full"
                                    />
                                ) : (
                                    <VideoModal
                                        isShow={showModal}
                                        setIsShow={setShowModal}
                                        url={uploadedFileURL}
                                    />
                                ))}
                        </>
                    )}
                </div>
                <div
                    className={`basis-1/2 ml-5 space-y-3 ${childrenClassName}`}
                >
                    {children}
                    <Button onClick={() => handleUploadFile()}>
                        <div>Upload</div>
                    </Button>
                </div>
            </div>
        </div>
    )
}
