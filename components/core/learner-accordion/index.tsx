import {
    LearningCourseLectures,
    useLearningCourseContext,
} from '@/containers/learn-course/learning-course-context'
import { faCircle } from '@fortawesome/free-regular-svg-icons'
import { faCheckCircle, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useMemo, useState } from 'react'
import LecturesListLearnerAccordion from './components/lectures-list-learner-accordion'

export interface ILearnerAccordionProps {
    order: number
    title: string
    lectures: LearningCourseLectures[]
    isLearning: boolean
}

export default function LearnerAccordion(props: ILearnerAccordionProps) {
    const { order, title, lectures, isLearning } = props
    const [selfExpand, setSelfExpand] = useState(false)
    const [learningLectureIndex, setLearningLectureIndex] = useState(0)
    const { currentPosition } = useLearningCourseContext()

    const countCompletedLessons = useMemo((): number => {
        let count = 0
        let isSetLearningLectureIndex = false
        lectures.forEach((lecture, index) => {
            if (lecture.learned) {
                count++
            }
            if (!lecture.learned && !isSetLearningLectureIndex) {
                setLearningLectureIndex(index)
                isSetLearningLectureIndex = true
            }
        })
        if (lectures.length === count) {
            setLearningLectureIndex(lectures.length - 1)
        }
        return count
    }, [lectures])

    useEffect(() => {
        if (currentPosition[0] === order) {
            setSelfExpand(true)
        } else {
            setSelfExpand(false)
        }
    }, [currentPosition])

    return (
        <>
            <div
                className={`px-5 bg-course-section space-y-2 ${
                    !selfExpand ? 'border-t' : 'border-y'
                } ${
                    order <= learningLectureIndex ? 'bg-white' : 'bg-slate-400'
                } border-border-box py-4 shadow-md cursor-pointer`}
                onClick={() => setSelfExpand(!selfExpand)}
            >
                <div className={`flex justify-between`}>
                    <div className="flex items-center justify-between w-full">
                        <div className="font-bold text-sm">
                            Section {order + 1}: {title}
                        </div>
                        <FontAwesomeIcon
                            icon={faChevronUp}
                            className={`px-2 arrow-animation text-xs ease-in ${
                                selfExpand ? 'rotate-0' : 'rotate-180'
                            }`}
                        />
                    </div>
                </div>
                <div className="flex space-x-2 items-center">
                    {countCompletedLessons === lectures.length ? (
                        <FontAwesomeIcon
                            icon={faCheckCircle}
                            className="text-green-500"
                        />
                    ) : (
                        <FontAwesomeIcon
                            icon={faCircle}
                            className="text-description"
                        />
                    )}

                    <div className="text-xs">{`${countCompletedLessons}/${lectures.length}`}</div>
                </div>
            </div>
            <LecturesListLearnerAccordion
                expand={selfExpand}
                lectures={lectures}
                isLearning={isLearning}
                learningLectureIndex={learningLectureIndex}
                sectionIndex={order}
            />
        </>
    )
}
