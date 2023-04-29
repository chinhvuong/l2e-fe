import LoadingScreen from '@/components/core/animate/loading-screen'
import CorrectQuizAnswerModal from '@/components/core/modal/correct-quiz-answer-modal'
import PlayQuizModal from '@/components/core/modal/play-quiz-modal'
import { useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import LearningInstructorDetail from './components/instructor'
import LearnerCourseContent from './components/learner-course-content'
import NavBarLearner from './components/nav-bar'
import LearningOverviewDetail from './components/overview'
import LearningReviewDetail from './components/reviews'
import { useLearningCourseContext } from './learning-course-context'
import LearningCommentsDetail from './components/comments'

const LearningCourseContent = () => {
    const {
        courseDetail,
        isLoading,
        playingVideo,
        currentQuiz,
        isCurrentLessonLearned,
        showPlayQuizModal,
        setShowPlayQuizModal,
        isPerfectScore,
        setIsPerfectScore,
        currentTab,
        setCurrentTab,
    } = useLearningCourseContext()

    const getTabContent = () => {
        switch (currentTab) {
            case 'Overview':
                return <LearningOverviewDetail />
            case 'Instructor':
                return <LearningInstructorDetail />
            case 'Ratings':
                return <LearningReviewDetail />
            case 'Comments':
                return <LearningCommentsDetail />
            default:
                return <></>
        }
    }

    // const [isReady, setIsReady] = useState(false)
    const playerRef = useRef<ReactPlayer>(null)

    // const onReady = useCallback(() => {
    //     if (!isReady) {
    //         const timeToStart = 3 * 60
    //         playerRef.current &&
    //             playerRef.current?.seekTo(timeToStart, 'seconds')
    //         setIsReady(true)
    //     }
    // }, [isReady])

    return (
        <div className="flex w-full">
            {showPlayQuizModal && currentQuiz && (
                <PlayQuizModal
                    isShow={showPlayQuizModal}
                    setIsShow={setShowPlayQuizModal}
                    quiz={currentQuiz}
                    isCurrentLessonLearned={isCurrentLessonLearned}
                />
            )}
            <CorrectQuizAnswerModal
                isShow={isPerfectScore}
                setIsShow={setIsPerfectScore}
            />
            <LoadingScreen isLoading={isLoading} />
            <div className="w-3/4 border-r">
                {courseDetail ? (
                    <ReactPlayer
                        url={playingVideo}
                        ref={playerRef}
                        playing={false}
                        controls={true}
                        volume={1}
                        width="100%"
                        height="65vh"
                        onEnded={() => {
                            !isCurrentLessonLearned &&
                                setShowPlayQuizModal(true)
                        }}
                        // onReady={onReady}
                    />
                ) : (
                    <div
                        role="status"
                        className="flex items-center justify-center h-[65vh] w-full bg-gray-300 animate-pulse dark:bg-gray-700"
                    >
                        <svg
                            className="w-12 h-12 text-gray-200 dark:text-gray-600"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 384 512"
                        >
                            <path d="M361 215C375.3 223.8 384 239.3 384 256C384 272.7 375.3 288.2 361 296.1L73.03 472.1C58.21 482 39.66 482.4 24.52 473.9C9.377 465.4 0 449.4 0 432V80C0 62.64 9.377 46.63 24.52 38.13C39.66 29.64 58.21 29.99 73.03 39.04L361 215z" />
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                )}
                <NavBarLearner
                    currentTab={currentTab}
                    setCurrentTab={setCurrentTab}
                />
                <div className="px-12 mt-8">{getTabContent()}</div>
            </div>
            <div className="w-1/4">
                <LearnerCourseContent />
            </div>
        </div>
    )
}

export default LearningCourseContent
