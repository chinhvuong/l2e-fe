import { LearningCourseLectures } from '@/containers/learn-course/learning-course-context'
import { faCircle } from '@fortawesome/free-regular-svg-icons'
import { faCheckCircle, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMemo, useState } from 'react'
import LecturesListLearnerAccordion from './components/lectures-list-learner-accordion'

export interface ILearnerAccordionProps {
    order: number
    title: string
    lectures: LearningCourseLectures[]
}

export default function LearnerAccordion(props: ILearnerAccordionProps) {
    const { order, title, lectures } = props
    const [selfExpand, setSelfExpand] = useState(false)

    const countCompletedLessons = (): number => {
        let count = 0
        lectures.forEach((lecture) => {
            if (lecture.learned) {
                count++
            }
        })
        return count
    }

    return (
        <>
            <div
                className={`px-5 bg-course-section space-y-2 ${
                    !selfExpand ? 'border-t' : 'border-y'
                } border-border-box py-4 cursor-pointer`}
            >
                <div
                    className={`flex justify-between`}
                    onClick={() => setSelfExpand(!selfExpand)}
                >
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
                    {countCompletedLessons() === lectures.length ? (
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

                    <div className="text-xs">{`${countCompletedLessons()}/${
                        lectures.length
                    }`}</div>
                </div>
            </div>
            <LecturesListLearnerAccordion
                expand={selfExpand}
                lectures={lectures}
            />
        </>
    )
}
