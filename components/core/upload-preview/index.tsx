import { FileAPI } from '@/api/api-path'
import { UploadOneFileResponse } from '@/api/dto/course.dto'
import useAPI from '@/api/hooks/useAPI'
import { useAppDispatch } from '@/hooks'
import { updateCanSaveCourseState } from '@/store/course'
import { noop } from 'lodash'
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
}

export default function UploadPreview(props: IUploadPreviewProps) {
    const [uploadedFile, setUploadedFile] = useState<File | null>(null)
    const [uploadedFileURL, setUploadedFileURL] = useState(props.defaultPreview)
    const [showModal, setShowModal] = useState(false)
    const dispatch = useAppDispatch()

    const { mutate: uploadFile, isLoading } = useAPI.post(
        FileAPI.UPLOAD_SINGLE_FILE,
        {
            onError: noop,
            onSuccess: (response: UploadOneFileResponse) => {
                props.setFileLink && props.setFileLink(response.url)
                setTimeout(() => dispatch(updateCanSaveCourseState(true)), 1000)
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
        inputFile.accept = props.type === 'image' ? 'image/*' : 'video/*'

        inputFile.click()

        inputFile.onchange = (e) => {
            const target = e.target as HTMLInputElement
            if (target.files && target.files[0]) {
                setUploadedFile(target.files[0])
                const formData = new FormData()
                formData.append('file', target.files[0])

                dispatch(updateCanSaveCourseState(false))
                uploadFile(formData)
            }
        }
    }

    return (
        <div className="space-y-3">
            <div className="font-bold ml-[25px]">{props.label}</div>
            <div className="flex">
                <div className="basis-1/2">
                    {isLoading ? (
                        <div className="flex justify-center items-center h-full">
                            <Loading />
                        </div>
                    ) : (
                        <>
                            {props.type === 'image' && (
                                <img
                                    src={uploadedFileURL}
                                    alt="Course image"
                                    className="w-full"
                                />
                            )}
                            {props.type === 'video' &&
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
                <div className="basis-1/2 ml-5 space-y-3">
                    {props.children}
                    <Button onClick={() => handleUploadFile()}>
                        <div>Upload</div>
                    </Button>
                </div>
            </div>
        </div>
    )
}
