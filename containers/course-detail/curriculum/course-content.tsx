import { useState } from 'react'
import {
    faCirclePlay,
    faCircleQuestion,
    faFile,
    faChevronDown,
    faChevronUp,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from '@/components/core/button'
import '@/styles/animations.scss'

export interface ICourseContentProps {}

export default function CourseContent() {
    const [expandHeadingSections, setExpandHeadingSections] = useState([
        false,
        false,
        false,
        false,
    ])
    const [expandSubSections, setExpandSubSections] = useState([false])
    const [allSections, setAllSections] = useState(false)

    const updateExpandHeadingSections = (index: number) => {
        const sections = [...expandHeadingSections]
        sections[index] = !sections[index]
        setExpandHeadingSections(sections)
    }

    const updateExpandSubSections = (index: number) => {
        const sections = [...expandSubSections]
        sections[index] = !sections[index]
        setExpandSubSections(sections)
    }

    const expandAllSections = () => {
        const sections = Array(expandHeadingSections.length).fill(!allSections)
        setAllSections(!allSections)
        setExpandHeadingSections(sections)
    }

    return (
        <div>
            <div className="font-semibold text-[26px]">Course content !!!</div>
            <div
                className={`flex justify-between my-4 under_lg:block under_lg:space-y-1`}
            >
                <div>101 sections • 676 lectures • 64h 2m total length</div>
                <div
                    className="text-hyperlink font-bold cursor-pointer"
                    onClick={() => expandAllSections()}
                >
                    {`${!allSections ? 'Expand' : 'Collapse'} all sections`}
                </div>
            </div>
            <div
                className={`flex items-start justify-between bg-course-section ${
                    !expandHeadingSections[0] ? 'border-t border-x' : 'border'
                } border-border-box pr-6 py-4 cursor-pointer`}
                onClick={() => updateExpandHeadingSections(0)}
            >
                <div className="flex items-start w-[70%] under_lg:w-full">
                    <FontAwesomeIcon
                        icon={faChevronUp}
                        className={`mt-1 px-6 arrow-animation ease-in ${
                            expandHeadingSections[0] ? 'rotate-0' : 'rotate-180'
                        }`}
                    />
                    <div className="font-bold text-[18px]">
                        Day 1 - Beginner - Working with Variables in Python to
                        Manage Data
                    </div>
                </div>
                <div className="under_lg:hidden">17 lectures • 1hr 30min</div>
            </div>
            <div
                className={`border-x ${!expandHeadingSections[0] && 'hidden'}`}
            >
                <div className="pt-3 pr-6">
                    <div className="flex justify-between">
                        <div className="flex items-start">
                            <FontAwesomeIcon
                                icon={faCirclePlay}
                                className="pt-1 px-6"
                            />
                            <div className="text-hyperlink underline">
                                What you’re going to get from this course
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
                                icon={
                                    !expandSubSections[0]
                                        ? faChevronDown
                                        : faChevronUp
                                }
                                className="bg-border-box p-1 rounded-full ml-4 cursor-pointer"
                                onClick={() => updateExpandSubSections(0)}
                            />
                        </div>
                        <div className="text-description">10 questions</div>
                    </div>
                    <div
                        className={`pr-6 pl-[63px] text-description pt-3 space-y-3 w-[75%] ${
                            !expandSubSections[0] && 'hidden'
                        }`}
                    >
                        <div className="font-bold">
                            Already learnt some Python? Want to skip ahead?
                        </div>
                        <div>
                            Take this skill assessment and see which level of
                            the course you should start at.
                        </div>
                    </div>
                </div>
                <div className="pb-3 ml-[0.15rem] mt-3 pr-6">
                    <div className="flex justify-between">
                        <div className="flex items-start">
                            <FontAwesomeIcon
                                icon={faFile}
                                className="pt-1 px-6"
                            />
                            <div>
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
                    !expandHeadingSections[1] ? 'border-t border-x' : 'border'
                } border-border-box pr-6 py-4 cursor-pointer`}
                onClick={() => updateExpandHeadingSections(1)}
            >
                <div className="flex items-start w-[70%] under_lg:w-full">
                    <FontAwesomeIcon
                        icon={
                            !expandHeadingSections[1]
                                ? faChevronDown
                                : faChevronUp
                        }
                        className="pt-1 px-6"
                    />
                    <div className="font-bold text-[18px]">
                        Day 2 - Beginner - Understanding Data Types and How to
                        Manipulate Strings
                    </div>
                </div>
                <div className="under_lg:hidden">10 lectures • 1hr 12min</div>
            </div>
            <div
                className={`flex items-start justify-between bg-course-section ${
                    !expandHeadingSections[2] ? 'border-t border-x' : 'border'
                } border-border-box pr-6 py-4 cursor-pointer`}
                onClick={() => updateExpandHeadingSections(2)}
            >
                <div className="flex items-start w-[70%] under_lg:w-full">
                    <FontAwesomeIcon
                        icon={
                            !expandHeadingSections[2]
                                ? faChevronDown
                                : faChevronUp
                        }
                        className="pt-1 px-6"
                    />
                    <div className="font-bold text-[18px]">
                        Day 3 - Beginner - Control Flow and Logical Operators
                    </div>
                </div>
                <div className="under_lg:hidden">12 lectures • 1hr 36min</div>
            </div>
            <div
                className={`flex items-start justify-between bg-course-section border border-border-box pr-6 py-4 cursor-pointer`}
                onClick={() => updateExpandHeadingSections(3)}
            >
                <div className="flex items-start w-[70%] under_lg:w-full">
                    <FontAwesomeIcon
                        icon={
                            !expandHeadingSections[3]
                                ? faChevronDown
                                : faChevronUp
                        }
                        className="pt-1 px-6"
                    />
                    <div className="font-bold text-[18px] under_lg:w-full">
                        Day 4 - Beginner - Randomisation and Python Lists
                    </div>
                </div>
                <div className="under_lg:hidden">9 lectures • 1hr 21min</div>
            </div>
            <Button className="btn-primary-outline w-full mt-5">
                <div className="font-medium text-[16px]">5 more sections</div>
            </Button>
        </div>
    )
}
