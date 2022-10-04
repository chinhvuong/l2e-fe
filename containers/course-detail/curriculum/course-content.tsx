import { useState } from 'react'
import {
    faCirclePlay,
    faCircleQuestion,
    faFile,
    faChevronDown,
    faChevronUp,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export interface ICourseContentProps {}

export default function CourseContent() {
    const [expandSections, setExpandSections] = useState([
        false,
        false,
        false,
        false,
    ])
    const [allSections, setAllSections] = useState(false)

    const updateExpandSections = (index: number) => {
        const sections = [...expandSections]
        sections[index] = !sections[index]
        setExpandSections(sections)
    }

    const expandAllSections = () => {
        const sections = Array(expandSections.length).fill(!allSections)
        setAllSections(!allSections)
        setExpandSections(sections)
    }

    return (
        <div>
            <div className="font-semibold text-[26px]">Course content</div>
            <div className="flex justify-between my-4">
                <div>101 sections • 676 lectures • 64h 2m total length</div>
                <div
                    className="text-hyperlink font-bold cursor-pointer"
                    onClick={() => expandAllSections()}
                >
                    {`${allSections ? 'Expand' : 'Collapse'} all sections`}
                </div>
            </div>
            <div
                className={`flex items-start justify-between bg-course-section ${
                    expandSections[0] ? 'border-t border-x' : 'border'
                } border-border-box pr-6 py-4 cursor-pointer`}
                onClick={() => updateExpandSections(0)}
            >
                <div className="flex items-start w-[70%]">
                    <FontAwesomeIcon
                        icon={expandSections[0] ? faChevronDown : faChevronUp}
                        className="pt-1 px-6"
                    />
                    <div className="font-bold text-[18px]">
                        Day 1 - Beginner - Working with Variables in Python to
                        Manage Data
                    </div>
                </div>
                <div>17 lectures • 1hr 30min</div>
            </div>
            <div className={`border-x ${expandSections[0] && 'hidden'}`}>
                <div className="pt-3 pr-6">
                    <div className="flex justify-between">
                        <div className="flex items-start">
                            <FontAwesomeIcon
                                icon={faCirclePlay}
                                className="pt-1 px-6"
                            />
                            <div className="text-hyperlink underline">
                                What you’re goint to get from this course
                            </div>
                        </div>
                        <div className="text-description">03:27</div>
                    </div>
                </div>
                <div className="mt-3 pr-6">
                    <div className="flex justify-between">
                        <div className="flex items-start">
                            <FontAwesomeIcon
                                icon={faCircleQuestion}
                                className="pt-1 px-6"
                            />
                            <div>Skills Assessment</div>
                            <FontAwesomeIcon
                                icon={faChevronDown}
                                className="bg-border-box p-1 rounded-full ml-4"
                            />
                        </div>
                        <div className="text-description">10 questions</div>
                    </div>
                </div>
                <div className="pb-3 ml-[0.15rem] mt-3 pr-6">
                    <div className="flex justify-between">
                        <div className="flex items-start">
                            <FontAwesomeIcon
                                icon={faFile}
                                className="pt-1 px-6"
                            />
                            <div className="ml-[0.15rem]">
                                FAQ: Can I Use PyCharm/VSCode/ Another Local
                                Code Editor?
                            </div>
                        </div>
                        <div className="text-description">00:53</div>
                    </div>
                </div>
            </div>
            <div
                className={`flex items-start justify-between bg-course-section ${
                    expandSections[1] ? 'border-t border-x' : 'border'
                } border-border-box pr-6 py-4 cursor-pointer`}
                onClick={() => updateExpandSections(1)}
            >
                <div className="flex items-start w-[70%]">
                    <FontAwesomeIcon
                        icon={expandSections[1] ? faChevronDown : faChevronUp}
                        className="pt-1 px-6"
                    />
                    <div className="font-bold text-[18px]">
                        Day 2 - Beginner - Understanding Data Types and How to
                        Manipulate Strings
                    </div>
                </div>
                <div>10 lectures • 1hr 12min</div>
            </div>
            <div
                className={`flex items-start justify-between bg-course-section ${
                    expandSections[1] ? 'border-t border-x' : 'border'
                } border-border-box pr-6 py-4 cursor-pointer`}
                onClick={() => updateExpandSections(2)}
            >
                <div className="flex items-start w-[70%]">
                    <FontAwesomeIcon
                        icon={expandSections[2] ? faChevronDown : faChevronUp}
                        className="pt-1 px-6"
                    />
                    <div className="font-bold text-[18px]">
                        Day 3 - Beginner - Control Flow and Logical Operators
                    </div>
                </div>
                <div>12 lectures • 1hr 36min</div>
            </div>
            <div
                className={`flex items-start justify-between bg-course-section border border-border-box pr-6 py-4 cursor-pointer`}
                onClick={() => updateExpandSections(3)}
            >
                <div className="flex items-start w-[70%]">
                    <FontAwesomeIcon
                        icon={expandSections[3] ? faChevronDown : faChevronUp}
                        className="pt-1 px-6"
                    />
                    <div className="font-bold text-[18px]">
                        Day 4 - Beginner - Randomisation and Python Lists
                    </div>
                </div>
                <div>9 lectures • 1hr 21min</div>
            </div>
        </div>
    )
}
