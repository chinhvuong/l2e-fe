import Accordion from '@/components/core/accordion'
import Button from '@/components/core/button'
import { CourseSectionWithLectures } from '@/store/course/types'
import '@/styles/animations.scss'
import { useState } from 'react'

export interface ICourseContentProps {
    sections: CourseSectionWithLectures[]
}

export default function CourseContent({ sections }: ICourseContentProps) {
    const [expandAllSections, setExpandAllSections] = useState(false)
    const [showAllSections, setShowAllSections] = useState(false)

    const getCourseContentUI = () => {
        const renderedSections = showAllSections
            ? sections
            : [...sections.slice(0, 10)]

        return (
            <div className="border-b border-border-box">
                {renderedSections.map((section, index) => {
                    return (
                        <Accordion
                            title={section.name}
                            overview={section.description}
                            lectures={section.lessons}
                            expandAllSections={expandAllSections}
                            key={index}
                        />
                    )
                })}
            </div>
        )
    }

    if (!sections) {
        return <></>
    }

    return (
        <div>
            <div className="font-semibold text-[26px]">Course content</div>
            <div
                className={`flex justify-between my-4 under_lg:block under_lg:space-y-1`}
            >
                <div>101 sections • 676 lectures • 64h 2m total length</div>
                <div
                    className="text-hyperlink font-bold cursor-pointer"
                    onClick={() => setExpandAllSections(!expandAllSections)}
                >
                    {`${
                        !expandAllSections ? 'Expand' : 'Collapse'
                    } all sections`}
                </div>
            </div>
            {sections && getCourseContentUI()}
            {sections && sections.length > 10 && (
                <Button
                    className="btn-primary-outline w-full mt-5"
                    onClick={() => setShowAllSections(!showAllSections)}
                >
                    <div className="font-medium text-[16px]">
                        {showAllSections
                            ? 'Hide all sections'
                            : `${sections.length - 10} more section`}
                    </div>
                </Button>
            )}
        </div>
    )
}
