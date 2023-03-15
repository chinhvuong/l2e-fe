import {
    faChevronDown,
    faChevronUp,
    faCirclePlay,
    faCircleQuestion,
    faFile,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'

export interface ILecturesListLearnerAccordionProps {
    expand: boolean
    lectures: ILecturesListItem[]
}

export interface ILecturesListItem {
    media: string
    mediaType: 'video' | 'faq'
    name: string
    length?: string
}

// Quiz UI

// <div className="mt-3 pr-6">
//     <div className="flex justify-between">
//         <div className="flex items-start">
//             <FontAwesomeIcon icon={faCircleQuestion} className="pt-1 px-6" />
//             <div>Skills Assessment</div>
//             <FontAwesomeIcon
//                 icon={!expand ? faChevronDown : faChevronUp}
//                 className="bg-border-box p-1 rounded-full ml-4 cursor-pointer"
//                 onClick={() => setexpand(!expand)}
//             />
//         </div>
//         <div className="text-description">10 questions</div>
//     </div>
//     <div
//         className={`pr-6 pl-[63px] text-description pt-3 space-y-3 w-[75%] ${
//             !expandSubSections[0] && 'hidden'
//         }`}
//     >
//         <div className="font-bold">
//             Already learnt some Python? Want to skip ahead?
//         </div>
//         <div>
//             Take this skill assessment and see which level of the course you
//             should start at.
//         </div>
//     </div>
// </div>

export default function LecturesListLearnerAccordion(
    props: ILecturesListLearnerAccordionProps,
) {
    const { expand, lectures } = props

    const getLectureUI = (data: ILecturesListItem) => {
        if (data.mediaType === 'video') {
            return (
                <div className="flex justify-between">
                    <div className="flex items-start">
                        <FontAwesomeIcon
                            icon={faCirclePlay}
                            className="pt-1 px-6"
                        />
                        <div className="text-hyperlink underline">
                            {data.name}
                        </div>
                    </div>
                    <div className="text-description">{data.length}</div>
                </div>
            )
        }
        if (data.mediaType === 'faq') {
            return (
                <div className="flex justify-between">
                    <div className="flex items-start">
                        <FontAwesomeIcon
                            icon={faFile}
                            className="pt-1 px-6 w-4"
                        />
                        <div>{data.name}</div>
                    </div>
                    <div className="text-description">{data.length}</div>
                </div>
            )
        }
    }

    return (
        <div className={`border-x ${!expand && 'hidden'} py-3 pr-6 space-y-3`}>
            {lectures.map((lecture, index) => (
                <div key={index}>{getLectureUI(lecture)}</div>
            ))}
        </div>
    )
}
