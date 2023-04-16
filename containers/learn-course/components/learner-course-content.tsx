import LearnerAccordion from '@/components/core/learner-accordion'
import '@/styles/animations.scss'
import {
    LearningCourseSections,
    useLearningCourseContext,
} from '../learning-course-context'
import Button from '@/components/core/button'
import { useState } from 'react'
import PlayFinalQuizModal from '@/components/core/modal/play-final-quiz-modal'

export default function LearnerCourseContent() {
    const { courseDetail } = useLearningCourseContext()
    const [showFinalQuizModal, setShowPlayFinalQuizModal] = useState(false)

    const getDefaultLearningPosition = (): number[] => {
        courseDetail?.sections.forEach((section, sectionIndex) => {
            section.lessons.forEach((lesson, lessonIndex) => {
                if (!lesson.learned) {
                    return [sectionIndex, lessonIndex]
                }
            })
        })
        return [0, 0]
    }

    const getLearnerCourseContentUI = (sections: LearningCourseSections[]) => {
        const learningPos = getDefaultLearningPosition()

        return (
            <div className="border-b border-border-box">
                {sections.map((section, index) => {
                    return (
                        <LearnerAccordion
                            title={section.name}
                            lectures={section.lessons}
                            order={index}
                            key={index}
                            isLearning={index === learningPos[0]}
                        />
                    )
                })}
                <div className="flex justify-center mt-5">
                    <Button
                        className="btn-primary"
                        onClick={() => setShowPlayFinalQuizModal(true)}
                    >
                        <div className="font-medium text-center">
                            Take the Final Test
                        </div>
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div>
            {courseDetail?.finalTest && (
                <PlayFinalQuizModal
                    isShow={showFinalQuizModal}
                    setIsShow={setShowPlayFinalQuizModal}
                    quiz={courseDetail.finalTest}
                />
            )}
            <div className="font-semibold text-lg my-4 ml-5">
                Course content
            </div>
            {courseDetail && getLearnerCourseContentUI(courseDetail.sections)}
        </div>
    )
}
