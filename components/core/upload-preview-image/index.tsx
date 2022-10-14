import * as React from 'react'

export interface IUploadPreviewImageProps {
    label: string
}

export default function UploadPreviewImage(props: IUploadPreviewImageProps) {
    return (
        <div className="space-y-3">
            <div className="font-bold ml-[10px]">{props.label}</div>
            <div></div>
        </div>
    )
}
