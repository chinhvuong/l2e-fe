import { CourseSectionWithLectures } from '@/store/course/types'
import ReactPlayer from 'react-player'
import LearnerCourseContent from './components/learner-course-content'

const LearnPageContainer = () => {
    const mockData: CourseSectionWithLectures[] = [
        {
            _id: '6405f69d00907f68a862b15c',
            name: 'Day 1 - Beginner - Working with Variables in Python to Manage Data',
            description: '',
            order: 0,
            lessons: [
                {
                    name: 'Day 1 Goals: what we will make by the end of the day',
                    description: '',
                    mediaType: 'video',
                    media: 'https://l2e-store.s3.ap-northeast-1.amazonaws.com/file-1677385279056.mp4',
                },
                {
                    name: "What you're going to get from this course",
                    description: '',
                    mediaType: 'video',
                    media: 'https://l2e-store.s3.ap-northeast-1.amazonaws.com/file-1677385279056.mp4',
                },
            ],
        },
        {
            _id: '6405f69d00907f68a862b15d',
            name: 'Day 2 - Beginner - Understanding Data Types and How to Manipulate Strings',
            description: '',
            order: 1,
            lessons: [
                {
                    name: 'Day 2 Goals: what we will make by the end of the day',
                    description: '',
                    mediaType: 'video',
                    media: 'https://l2e-store.s3.ap-northeast-1.amazonaws.com/file-1677385279056.mp4',
                },
            ],
        },
    ]

    return (
        <div className="flex">
            {/* <LoadingScreen isLoading={isLoading} /> */}
            <ReactPlayer
                url={'https://youtu.be/_5siHrpPnmw'}
                playing={false}
                controls={true}
                volume={1}
                width="75vw"
                height="65vh"
                onReady={() => console.log('ready now')}
            />
            <div className="w-[25vw]">
                <LearnerCourseContent sections={mockData} />
            </div>
        </div>
    )
}

export default LearnPageContainer
