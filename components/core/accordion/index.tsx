import { faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import LecturesListAccordion, {
    ILecturesListItem,
} from './components/lectures-list-accordion'

export interface IAccordionProps {
    title: string
    overview: string
    lectures: ILecturesListItem[]
    expandAllSections: boolean
}

export default function Accordion(props: IAccordionProps) {
    const { title, overview, lectures, expandAllSections } = props
    const [selfExpand, setSelfExpand] = useState(expandAllSections)

    useEffect(() => {
        setSelfExpand(expandAllSections)
    }, [expandAllSections])

    return (
        <>
            <div
                className={`flex items-start justify-between bg-course-section ${
                    !selfExpand ? 'border-t border-x' : 'border'
                } border-border-box pr-6 py-4 cursor-pointer`}
                onClick={() => setSelfExpand(!selfExpand)}
            >
                <div className="flex items-start w-[70%] under_lg:w-full">
                    <FontAwesomeIcon
                        icon={faChevronUp}
                        className={`mt-1 px-6 arrow-animation ease-in ${
                            selfExpand ? 'rotate-0' : 'rotate-180'
                        }`}
                    />
                    <div className="font-bold text-[18px]">{title}</div>
                </div>
                <div className="under_lg:hidden">{overview}</div>
            </div>
            <LecturesListAccordion expand={selfExpand} lectures={lectures} />
        </>
    )
}
