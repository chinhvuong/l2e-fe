import { useEffect, useState } from 'react'

export interface IUploadPreviewProps {
    label: string
    type: 'image' | 'video'
    description: string
}

export default function UploadPreview(props: IUploadPreviewProps) {
    const [uploadedFile, setUploadedFile] = useState<File | null>(null)
    const [uploadedFileURL, setUploadedFileURL] = useState(
        '/images/placeholder.jpeg',
    )
    const [showPlaceholder, setShowPlaceholder] = useState(true)

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
                console.log(target.files[0])
                setUploadedFile(target.files[0])
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
                        className={`w-full cursor-pointer ${
                            !showPlaceholder && 'hidden'
                        }`}
                        onClick={handleUploadFile}
                    />
                    {!showPlaceholder && (
                        <div
                            className="flex items-center cursor-pointer w-full h-[230px] px-5 bg-slate-300"
                            onClick={handleUploadFile}
                        >
                            Save the changes in order to complete the upload of
                            your file. Once you save it, we will process it to
                            ensure it works smoothly on Skilline.
                        </div>
                    )}
                </div>
                <div className="basis-1/2 ml-5">{props.description}</div>
            </div>
        </div>
    )
}
