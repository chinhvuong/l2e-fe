import LearnerAccordion from '@/components/core/learner-accordion'
import '@/styles/animations.scss'
import {
    LearningCourseSections,
    useLearningCourseContext,
} from '../learning-course-context'

export default function LearnerCourseContent() {
    const { courseDetail } = useLearningCourseContext()

    const getLearnerCourseContentUI = (sections: LearningCourseSections[]) => {
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

    return (
        <div>
            <div className="font-semibold text-lg my-4 ml-5">
                Course content
            </div>
            {courseDetail && getLearnerCourseContentUI(courseDetail.sections)}
        </div>
    )
}
