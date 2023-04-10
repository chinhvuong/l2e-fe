import {
    LearningCourseLectures,
    useLearningCourseContext,
} from '@/containers/learn-course/learning-course-context'
import { faCircle } from '@fortawesome/free-regular-svg-icons'
import {
    faCheckCircle,
    faCircleQuestion,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export interface ILecturesListLearnerAccordionProps {
    expand: boolean
    lectures: LearningCourseLectures[]
    isLearning: boolean
    learningLectureIndex: number
    sectionIndex: number
}

export interface ILecturesListItem {
    media: string
    mediaType: 'video'
    name: string
}

export default function LecturesListLearnerAccordion(
    props: ILecturesListLearnerAccordionProps,
) {
    const { expand, lectures, isLearning, learningLectureIndex, sectionIndex } =
        props
    const { handleChangeLecture } = useLearningCourseContext()

    const getLectureUI = (data: LearningCourseLectures, index: number) => {
        if (data.mediaType === 'video') {
            return (
                <div className="flex px-5 space-x-3">
                    {data.learned ? (
                        <FontAwesomeIcon
                            icon={faCheckCircle}
                            className="text-green-500 mt-0.5"
                        />
                    ) : (
                        <FontAwesomeIcon
                            icon={faCircle}
                            className="mt-0.5 text-description"
                        />
                    )}
                    <div className="space-y-3 w-full">
                        <div className="text-sm">
                            {index + 1}. {data.name}
                        </div>
                        {/* <div className="flex items-center space-x-2">
                            <FontAwesomeIcon
                                icon={faCirclePlay}
                                className="pb-0.5"
                            />
                            <div className="text-description text-xs">
                                10min
                            </div>
                        </div> */}
                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                                <FontAwesomeIcon
                                    icon={faCircleQuestion}
                                    className="pb-0.5"
                                />
                                <div className="text-description text-xs">
                                    {data.quizzes[0].name}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }

    const handleLectureClick = (index: number) => {
        if (isLearning && index <= learningLectureIndex) {
            handleChangeLecture([sectionIndex, index])
        }
        handleChangeLecture([sectionIndex, index])
    }

    return (
        <div className={`${!expand && 'hidden'}`}>
            {lectures.map((lecture, index) => (
                <div
                    key={index}
                    className={`hover:bg-primary-hover ${
                        isLearning && index <= learningLectureIndex
                            ? 'cursor-pointer'
                            : 'cursor-not-allowed bg-gray-300'
                    } py-3`}
                    onClick={() => handleLectureClick(index)}
                >
                    {getLectureUI(lecture, index)}
                </div>
            ))}
        </div>
    )
}
