import { LearningCourseLectures } from '@/containers/learn-course/learning-course-context'
import { faCheckCircle, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import LecturesListLearnerAccordion from './components/lectures-list-learner-accordion'

export interface ILearnerAccordionProps {
    order: number
    title: string
    lectures: LearningCourseLectures[]
}

export default function LearnerAccordion(props: ILearnerAccordionProps) {
    const { order, title, lectures } = props
    const [selfExpand, setSelfExpand] = useState(false)

    return (
        <>
            <div
                className={`px-5 bg-course-section space-y-1 ${
                    !selfExpand ? 'border-t border-x' : 'border'
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
                <div className="flex space-x-2">
                    <FontAwesomeIcon
                        icon={faCheckCircle}
                        className="text-green-500 mt-0.5"
                    />
                    <div className="text-sm">{`0/${lectures.length}`}</div>
                </div>
            </div>
            <LecturesListLearnerAccordion
                expand={selfExpand}
                lectures={lectures}
            />
        </>
    )
}
