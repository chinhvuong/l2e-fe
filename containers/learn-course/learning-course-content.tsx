import { useCallback, useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import LearningInstructorDetail from './components/instructor'
import LearnerCourseContent from './components/learner-course-content'
import NavBarLearner from './components/nav-bar'
import LearningOverviewDetail from './components/overview'
import LearningReviewDetail from './components/reviews'
import { useLearningCourseContext } from './learning-course-context'

const LearningCourseContent = () => {
    const { sectionsMockData } = useLearningCourseContext()
    const [currentTab, setCurrentTab] = useState('Overview')

    const getTabContent = () => {
        switch (currentTab) {
            case 'Overview':
                return <LearningOverviewDetail />
            case 'Instructor':
                return <LearningInstructorDetail />
            case 'Ratings':
                return <LearningReviewDetail />
            default:
                return <></>
        }
    }

    const [isPlaying, setIsPlaying] = useState(true)
    const [isReady, setIsReady] = useState(false)
    const playerRef = useRef<ReactPlayer>(null)

    const onReady = useCallback(() => {
        if (!isReady) {
            const timeToStart = 3 * 60
            playerRef.current &&
                playerRef.current?.seekTo(timeToStart, 'seconds')
            setIsReady(true)
        }
    }, [isReady])

    return (
        <div className="flex">
            {/* <LoadingScreen isLoading={isLoading} /> */}
            <div className="w-[75%]">
                <ReactPlayer
                    url={'https://youtu.be/_5siHrpPnmw'}
                    ref={playerRef}
                    playing={isPlaying}
                    controls={true}
                    volume={1}
                    width="100%"
                    height="65vh"
                    onReady={onReady}
                />
                <NavBarLearner setCurrentTab={setCurrentTab} />
                <div className="px-12 mt-8">{getTabContent()}</div>
            </div>
            <div className="w-[25%]">
                <LearnerCourseContent sections={sectionsMockData} />
            </div>
        </div>
    )
}

export default LearningCourseContent
