import { useCourse } from '@/api/hooks/useCourse'
import { ReactNode, ReactText, useEffect, useState } from 'react'
import Button from '../button'

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
    const [showPlaceholder, setShowPlaceholder] = useState(true)

    const { useUploadSingleFile } = useCourse()
    const { mutate: uploadFile } = useUploadSingleFile({
        onError: () => {},
        onSuccess: (response) => {
            props.setFileLink && props.setFileLink(response)
        },
    })

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

                uploadFile(formData)

                if (props.type === 'video') {
                    setShowPlaceholder(false)
                }
            }
        }
    }

    return (
        <div className="space-y-3">
            <div className="font-bold ml-[10px]">{props.label}</div>
            <div className="flex">
                <div className="basis-1/2">
                    <img
                        src={uploadedFileURL}
                        alt="Course image"
                        className={`w-full ${!showPlaceholder && 'hidden'}`}
                    />
                    {!showPlaceholder && (
                        <div className="flex items-center w-full h-[230px] px-5 bg-slate-300">
                            Save the changes in order to complete the upload of
                            your file. Once you save it, we will process it to
                            ensure it works smoothly on Skilline.
                        </div>
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
