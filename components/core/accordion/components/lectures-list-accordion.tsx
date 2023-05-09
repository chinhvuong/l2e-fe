import { faCirclePlay, faFile } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export interface ILecturesListAccordionProps {
    expand: boolean
    lectures: ILecturesListItem[]
}

export interface ILecturesListItem {
    mediaType: 'video' | 'faq'
    name: string
    length?: string
}

export default function LecturesListAccordion(
    props: ILecturesListAccordionProps,
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
                        <div>{data.name}</div>
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
