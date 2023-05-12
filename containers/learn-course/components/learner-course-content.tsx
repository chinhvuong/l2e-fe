import Button from '@/components/core/button'
import LearnerAccordion from '@/components/core/learner-accordion'
import PlayFinalTestModal from '@/components/core/modal/play-final-quiz-modal'
import '@/styles/animations.scss'
import { useState } from 'react'
import {
    LearningCourseRes,
    useLearningCourseContext,
} from '../learning-course-context'

export default function LearnerCourseContent() {
    const { courseDetail, currentPosition } = useLearningCourseContext()
    const [showFinalTestModal, setShowPlayFinalTestModal] = useState(false)

    const getLearnerCourseContentUI = (course: LearningCourseRes) => {
        const learningPos = currentPosition

        return (
            <div className="border-b border-border-box">
                {course.sections.map((section, index) => {
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
                <div className="flex justify-center py-5 border-t">
                    <Button
                        className="btn-primary"
                        disabled={learningPos[2] === 0 || course.finalTest.play}
                        onClick={() => setShowPlayFinalTestModal(true)}
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
                <PlayFinalTestModal
                    isShow={showFinalTestModal}
                    setIsShow={setShowPlayFinalTestModal}
                    quiz={courseDetail.finalTest}
                />
            )}
            <div className="font-semibold text-lg my-4 ml-5">
                Course content
            </div>
            {courseDetail && getLearnerCourseContentUI(courseDetail)}
        </div>
    )
}
