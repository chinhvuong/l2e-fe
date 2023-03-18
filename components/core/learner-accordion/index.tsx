import { faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import LecturesListLearnerAccordion, {
    ILecturesListItem,
} from './components/lectures-list-learner-accordion'

export interface ILearnerAccordionProps {
    order: number
    title: string
    lectures: ILecturesListItem[]
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
                    <div className="flex items-start under_lg:w-full">
                        <div className="font-bold text-sm">
                            Section {order + 1}: {title}
                        </div>
                        <FontAwesomeIcon
                            icon={faChevronUp}
                            className={`mt-1 px-2 arrow-animation text-xs ease-in ${
                                selfExpand ? 'rotate-0' : 'rotate-180'
                            }`}
                        />
                    </div>
                </div>
                <div className="text-sm">{`0/${lectures.length}`}</div>
            </div>
            <LecturesListLearnerAccordion
                expand={selfExpand}
                lectures={lectures}
            />
        </>
    )
}
