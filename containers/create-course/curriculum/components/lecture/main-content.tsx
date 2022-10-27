import Hyperlink from '@/containers/create-course/components/hyperlink'
import {
    faFileLines,
    faFilePowerpoint,
    faFileVideo,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'

export interface IMainContentProps {}

export default function MainContent(props: IMainContentProps) {
    const [contentType, setContentType] = useState<
        'video' | 'slide' | 'article'
    >('video')

    return (
        <div className="space-y-5 py-5 border-t border-black">
            <div className="text-sm text-center">
                Select the main type of content. Files and links can be added as
                resources. <Hyperlink>Learn about content types.</Hyperlink>
            </div>
            <div className="flex items-center justify-center space-x-7">
                <div
                    className={`flex flex-col space-y-3 items-center w-[100px] text-center py-3 px-2 border border-black hover:border-primary hover:bg-primary hover:text-white rounded-[10px] cursor-pointer`}
                    onClick={() => setContentType('video')}
                >
                    <FontAwesomeIcon icon={faFileVideo} className="text-lg" />
                    <div className="font-bold text-xs">Video</div>
                </div>
                <div
                    className={`flex flex-col space-y-3 items-center w-[100px] text-center py-3 px-2 border border-black hover:border-primary hover:bg-primary hover:text-white rounded-[10px] cursor-pointer`}
                    onClick={() => setContentType('slide')}
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
                    <FontAwesomeIcon icon={faFileLines} className="text-lg" />
                    <div className="font-bold text-xs">Article</div>
                </div>
            </div>
        </div>
    )
}
