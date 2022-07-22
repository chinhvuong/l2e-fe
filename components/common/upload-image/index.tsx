import React from 'react'
import AddIcon from '@/public/svgs/add.svg'
import AddIcon94 from '@/public/svgs/add-94.svg'
type Props = {
    image: string | null | undefined
    // eslint-disable-next-line no-unused-vars
    onChange: (e: any) => void
    label: string
    iconClass?: string
}

function UploadImg({ image, label, iconClass, onChange }: Props) {
    const handleFile = (file: File | undefined | null) => {
        if (file && file.type.startsWith('image')) {
            const url = URL.createObjectURL(file)

            onChange({
                url: url,
                file: file,
            })
        } else {
            onChange({
                url: '',
                file: null,
            })
        }
    }
    const onSelect = () => {
        const inputFile = document.createElement('input')
        inputFile.type = 'file'
        inputFile.accept = 'image/*'

        inputFile.click()

        inputFile.onchange = (e) => {
            const target = e.target as HTMLInputElement
            handleFile(target.files?.length ? target.files[0] : null)
        }
    }
    return (
        <div
            className="flex-center cursor-pointer w-full pt-[100%] relative border-2 border-dashed border-black/40 rounded-2xl"
            onClick={onSelect}
        >
            {image ? (
                <div className="absolute top-0 right-0 left-0 bottom-0 rounded-[inherit]">
                    <img
                        src={image}
                        alt=""
                        className="w-full h-full object-cover rounded-[inherit]"
                    />
                </div>
            ) : (
                <div className="flex-center flex-col w-fit-content absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className={`w-8 h-8 ${iconClass}`}>
                        {iconClass ? (
                            <AddIcon94 className={`w-full h-full`} />
                        ) : (
                            <AddIcon className={`w-full h-full`} />
                        )}
                    </div>

                    <span className="text-black-70 ">{label}</span>
                </div>
            )}
        </div>
    )
}

export default UploadImg
