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
    const { handleChangeLecture, currentPosition, lastCanLearnPosition } =
        useLearningCourseContext()

    const handleLectureClick = (index: number) => {
        if (isLearning && index <= learningLectureIndex) {
            handleChangeLecture([sectionIndex, index])
        }
        handleChangeLecture([sectionIndex, index])
    }

    const isClickableLesson = (
        isLearned: boolean,
        lessonIdx: number,
    ): boolean => {
        return (
            isLearned ||
            (sectionIndex === 0 && lessonIdx === 0) ||
            (sectionIndex === lastCanLearnPosition[0] &&
                lessonIdx === lastCanLearnPosition[1])
        )
    }

    return (
        <div className={`${!expand && 'hidden'}`}>
            {lectures.map((lecture, index) => (
                <div
                    key={index}
                    className={`group hover:bg-primary-hover hover:text-white ${
                        currentPosition[0] === sectionIndex &&
                        currentPosition[1] === index &&
                        'text-white bg-primary'
                    } ${
                        isClickableLesson(lecture.learned, index)
                            ? 'cursor-pointer'
                            : 'cursor-not-allowed bg-gray-300'
                    } py-3`}
                    onClick={() => {
                        isClickableLesson(lecture.learned, index) &&
                            handleLectureClick(index)
                    }}
                >
                    <div className="flex px-5 space-x-3">
                        {lecture.learned ? (
                            <FontAwesomeIcon
                                icon={faCheckCircle}
                                className="text-green-500 mt-0.5 bg-white rounded-full"
                            />
                        ) : (
                            <FontAwesomeIcon
                                icon={faCircle}
                                className="mt-0.5 text-description group-hover:text-white"
                            />
                        )}
                        <div className="space-y-3 w-full">
                            <div className="text-sm">
                                {index + 1}. {lecture.name}
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
                                    <div
                                        className={`group-hover:text-white text-xs ${
                                            currentPosition[0] ===
                                                sectionIndex &&
                                            currentPosition[1] === index
                                                ? 'text-white'
                                                : 'text-description'
                                        }`}
                                    >
                                        {lecture.quizzes[0].name}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
