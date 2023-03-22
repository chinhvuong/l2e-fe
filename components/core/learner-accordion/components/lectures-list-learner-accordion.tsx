import { LearningCourseLectures } from '@/containers/learn-course/learning-course-context'
import {
    faCheckCircle,
    faCirclePlay,
    faCircleQuestion,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export interface ILecturesListLearnerAccordionProps {
    expand: boolean
    lectures: LearningCourseLectures[]
}

export interface ILecturesListItem {
    media: string
    mediaType: 'video'
    name: string
}

export default function LecturesListLearnerAccordion(
    props: ILecturesListLearnerAccordionProps,
) {
    const { expand, lectures } = props

    const getLectureUI = (data: LearningCourseLectures, index: number) => {
        if (data.mediaType === 'video') {
            return (
                <div className="flex px-5 space-x-3">
                    <FontAwesomeIcon
                        icon={faCheckCircle}
                        className="text-green-500 mt-0.5"
                    />
                    {/* <FontAwesomeIcon icon={faCircle} className="mt-0.5" /> */}
                    <div className="space-y-2 w-full">
                        <div className="text-sm">
                            {index + 1}. {data.name}
                        </div>
                        <div className="flex items-center space-x-2">
                            <FontAwesomeIcon
                                icon={faCirclePlay}
                                className="pb-0.5"
                            />
                            <div className="text-description text-xs">
                                10min
                            </div>
                        </div>
                        <div className="flex justify-between pt-1">
                            <div className="flex items-center space-x-2">
                                <FontAwesomeIcon
                                    icon={faCircleQuestion}
                                    className="pb-0.5"
                                />
                                <div className="text-xs">Skills Assessment</div>
                            </div>
                            <div className="text-description text-xs pt-0.5">
                                10 questions
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }

    return (
        <div className={`border-x ${!expand && 'hidden'}`}>
            {lectures.map((lecture, index) => (
                <div
                    key={index}
                    className="hover:bg-gray-300 cursor-pointer py-3"
                >
                    {getLectureUI(lecture, index)}
                </div>
            ))}
        </div>
    )
}
