import { CourseSectionWithLectures } from '@/store/course/types'
import { createContext, useContext } from 'react'

interface ILearningCourseContext {
    sectionsMockData: CourseSectionWithLectures[]
    courseData: any
}

export const LearningCourseContext = createContext<ILearningCourseContext>(
    {} as ILearningCourseContext,
)

export const LearningCourseProvider: React.FC<React.PropsWithChildren<{}>> = ({
    children,
}) => {
    const sectionsMockData: CourseSectionWithLectures[] = [
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

    const courseData = {
        _id: '63f4dbb46d729ed45020ec15',
        name: 'Crash Course: Build a Full-Stack Web App in a Weekend!',
        overview:
            'A quick, fun, and hands-on introduction to web development. Build a complete app with HTML, CSS, JavaScript, and React!',
        description:
            '<p>Do you want to learn the fundamentals of modern web development <strong>fast</strong>?</p><p>Do you want to find out if building websites and apps is the <strong>right career path</strong> for you?</p><p>Or maybe you just want to know what your web developer friends do all day?</p><p>In any of these cases...</p><p><strong>Welcome to my &quot;Web Development Crash Course&quot;! Together, we will build a fun, small, but full-stack web application in just a few days.</strong></p><p><strong><em>But why this course? And why is it so short?</em></strong></p><p>Well, there are so many 60 and 80-hour-long &quot;complete&quot; web development courses out there, which are great if you want to invest 3 months of your life into finding out if web dev is even right for you or not...</p><p><strong>I wanted to offer a different approach.</strong> A short and fast crash course, where you can dip your toes into the world of <strong>HTML</strong>, <strong>CSS</strong>, <strong>JavaScript</strong>, and even <strong>React</strong> (the most used JavaScript library in the world).</p><p>You can finish it in a weekend (if you have nothing else planned), or you can take a week. But the point is that <strong>you can learn the very fundamentals of web development quite fast</strong>, and in an engaging, 99% project-based way.</p><p>And even though this is called a &quot;crash course&quot;, <strong>this course teaches you more in 12 hours than I learned in my first 2 years</strong> as a web developer!</p><p>That&#x27;s how condensed, and how valuable, the material is. And the course still maintains the <strong>high-quality standard</strong> of all my other courses, so that you actually understand what you are learning!</p><p><strong><em>But you might be thinking: &quot;Is a crash course really right for me?&quot;</em></strong></p><p>Well, it all depends on your goals.</p><p>Sure, you will not become a web developer after this short course, and you will not be able to build big web projects (but sometimes that&#x27;s true even for those huge 80-hour courses).</p><p>But, at the end of this course, you will have <strong>learned and understood the fundamentals of the most important web technologies</strong> (HTML, CSS, JavaScript, React). And even more importantly, you will have <strong>discovered if you actually like web development</strong> and want to pursue it as a (lucrative) career!</p><p>Plus, you will walk away from this course with a super cool web application that you can show to all your friends (please tell them I sent you ;)</p><p>All this will enable you to go deeper into the topics that you actually liked, and keep learning and progressing on your own if you like (or of course, you can purchase more specialized courses).</p>',
        price: 100,
        rating: 0,
        reviews: 0,
        students: 1,
        language: 'en',
        approved: true,
        requirements: [
            'No programming experience needed!',
            'You WILL build a fun web application in just a few days! No experience needed You WILL build a fun web application in just a few days! No experience needed',
            'You WILL learn the very fundamentals of modern web development (fast!)',
            'You WILL get the experience of building a complete web app',
            'You WILL discover if web development is a good career path for you',
        ],
        goals: [
            'You WILL build a fun web application in just a few days! No experience needed You WILL build a fun web application in just a few days! No experience needed',
            'You WILL learn the very fundamentals of modern web development (fast!)',
            'You WILL get the experience of building a complete web app',
            'You WILL discover if web development is a good career path for you',
        ],
        thumbnail:
            'https://l2e-store.s3.ap-northeast-1.amazonaws.com/file-1676991483688.jpeg',
        createdAt: '2023-02-21T14:56:52.394Z',
        updatedAt: '2023-03-01T15:39:47.246Z',
        include: {},
        promotionalVideo:
            'https://l2e-store.s3.ap-northeast-1.amazonaws.com/file-1677391705756.mp4',
        courseId: 9,
        author: {
            _id: '637074809212c6d10a6168ff',
            walletAddress: '0x4BCD25Ac40C446D28318c225b613AF963C4BC3f8',
            __v: 0,
            avatar: null,
            bio: null,
            createdAt: '2022-11-13T04:37:20.135Z',
            name: null,
            rating: 0,
            title: null,
            updatedAt: '2023-03-16T13:22:15.591Z',
            nonce: 9,
        },
        category: {
            _id: '6357fe17934b49535b9c7af9',
            name: 'IT',
            slug: 'it',
            banner: 'https://dlearn-storage.herokuapp.com/research-and-development-1665840546844-201407850.png',
            thumbnail:
                'https://dlearn-storage.herokuapp.com/research-and-development-1665840546844-201407850.png',
            color: '#2267B5',
            __v: 0,
            createdAt: '2022-10-25T15:17:43.381Z',
            updatedAt: '2022-10-25T15:17:43.381Z',
        },
        ratingCount: 0,
        sections: [
            {
                _id: '63fcdd0f90357150b07b4f3b',
                name: 'Welcome, Welcome, Welcome!',
                description: '',
                order: 0,
                lessons: [
                    {
                        name: 'Introduction',
                        description: '',
                        mediaType: 'video',
                    },
                    {
                        name: 'A High-Level Overview of Web Development',
                        description: '',
                        mediaType: 'video',
                    },
                    {
                        name: 'Setting Up Our Code Editor',
                        description: '',
                        mediaType: 'video',
                    },
                ],
            },
        ],
    }

    return (
        <LearningCourseContext.Provider
            value={{
                sectionsMockData,
                courseData,
            }}
        >
            {children}
        </LearningCourseContext.Provider>
    )
}

export const useLearningCourseContext = () => {
    return useContext(LearningCourseContext) as ILearningCourseContext
}
