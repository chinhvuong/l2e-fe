import LearnerAccordion from '@/components/core/learner-accordion'
import { CourseSectionWithLectures } from '@/store/course/types'
import '@/styles/animations.scss'

export interface ILearnerCourseContentProps {
    sections: CourseSectionWithLectures[]
}

export default function LearnerCourseContent({
    sections,
}: ILearnerCourseContentProps) {
    const getLearnerCourseContentUI = () => {
        return (
            <div className="border-b border-border-box">
                {sections.map((section, index) => {
                    return (
                        <LearnerAccordion
                            title={section.name}
                            lectures={section.lessons}
                            order={index}
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
            <div className="font-semibold text-lg my-4 ml-5">
                Course content
            </div>
            {sections && getLearnerCourseContentUI()}
        </div>
    )
}
