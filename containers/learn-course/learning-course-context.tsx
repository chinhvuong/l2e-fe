import { LearnerAPI, UserAPI } from '@/api/api-path'
import useAPI from '@/api/hooks/useAPI'
import { noop } from 'lodash'
import { useRouter } from 'next/router'
import {
    Dispatch,
    SetStateAction,
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react'

export interface LectureQuiz {
    _id: string
    questions: string[]
    courseId: string
    name: string
    createdAt: string
    updatedAt: string
    __v: number
}

export interface LearningCourseLectures {
    _id: string
    name: string
    description: string
    media: string
    mediaName: string
    mediaType: string
    quizzes: LectureQuiz[]
    sectionId: string
    mode: string
    learned: boolean
    order: number
    updatedAt: string
    createdAt: string
    __v: number
}

export interface LearningCourseSections {
    _id: string
    courseId: string
    name: string
    description: string
    order: number
    createdAt: string
    updatedAt: string
    __v: number
    lessons: LearningCourseLectures[]
}
export interface LearningCourseRes {
    include: {}
    _id: string
    owner: string
    author: string
    name: string
    overview: string
    description: string
    finalTest: LectureQuiz
    price: number
    rating: number
    reviews: number
    students: number
    language: string
    approved: true
    requirements: string[]
    goals: string[]
    thumbnail: string
    category: string
    createdAt: string
    updatedAt: string
    __v: number
    promotionalVideo: string
    courseId: number
    sections: LearningCourseSections[]
}

interface ILearningCourseContext {
    courseDetail: LearningCourseRes | undefined
    isLoading: boolean
    playingVideo: string
    handleChangeLecture: (pos: number[]) => void
    myAccountBalance: number
    currentQuiz: LectureQuiz | undefined
    isCurrentLessonLearned: boolean
    showPlayQuizModal: boolean
    setShowPlayQuizModal: Dispatch<SetStateAction<boolean>>
    isPerfectScore: boolean
    setIsPerfectScore: Dispatch<SetStateAction<boolean>>
    handlePerfectScore: (isOpen: boolean) => void
}

export const LearningCourseContext = createContext<ILearningCourseContext>(
    {} as ILearningCourseContext,
)

export const LearningCourseProvider: React.FC<React.PropsWithChildren<{}>> = ({
    children,
}) => {
    const [courseId, setCourseId] = useState('')
    const [playingVideo, setPlayingVideo] = useState<string>('')
    const [myAccountBalance, setMyAccountBalance] = useState(0)
    const [showPlayQuizModal, setShowPlayQuizModal] = useState(false)

    const router = useRouter()

    const [courseDetail, setCourseDetail] = useState<
        LearningCourseRes | undefined
    >(undefined)

    // const [currentPosition, setCurrentPosition] = useState<number[]>([0, 0])
    const [currentQuiz, setCurrentQuiz] = useState<LectureQuiz | undefined>(
        undefined,
    )
    const [isCurrentLessonLearned, setIsCurrentLessonLearned] =
        useState<boolean>(false)

    const [isPerfectScore, setIsPerfectScore] = useState(false)

    const handlePerfectScore = (isOpen: boolean) => {
        if (isOpen) {
            setIsPerfectScore(true)
            getMyBalance({})
        } else {
            setIsPerfectScore(false)
        }
    }

    const {
        mutate: getLearningCourseDetail,
        isLoading: isLoadingLearningCourseDetail,
    } = useAPI.getMutation(
        LearnerAPI.GET_LEARNING_COURSE_DETAIL + '?id=' + courseId,
        {
            onError: () => {},
            onSuccess: (response) => {
                setCourseDetail(response)
            },
        },
    )

    const { mutate: getMyBalance, isLoading: isLoadingGetMyBalance } =
        useAPI.getMutation(UserAPI.GET_MY_BALANCE, {
            onError: noop,
            onSuccess: (response) => {
                setMyAccountBalance(response.balance)
            },
        })

    const getDefaultPlayedVideo = (): string => {
        let result = ''
        courseDetail?.sections.forEach((section, sectionIndex) => {
            section.lessons.forEach((lesson, lessonIndex) => {
                if (!lesson.learned && result === '') {
                    result = lesson.media
                    // setCurrentPosition([sectionIndex, lessonIndex])
                    setCurrentQuiz(
                        courseDetail?.sections[sectionIndex].lessons[
                            lessonIndex
                        ].quizzes[0],
                    )
                    setIsCurrentLessonLearned(
                        courseDetail?.sections[sectionIndex].lessons[
                            lessonIndex
                        ].learned,
                    )
                }
            })
        })
        return result
    }

    const handleChangeLecture = (pos: number[]) => {
        // setCurrentPosition(pos)
        setCurrentQuiz(
            courseDetail?.sections[pos[0]].lessons[pos[1]].quizzes[0],
        )
        setIsCurrentLessonLearned(
            courseDetail?.sections[pos[0]].lessons[pos[1]].learned ?? false,
        )
        courseDetail &&
            setPlayingVideo(courseDetail.sections[pos[0]].lessons[pos[1]].media)
    }

    const isLoading = useMemo(() => {
        return isLoadingLearningCourseDetail || isLoadingGetMyBalance
    }, [isLoadingLearningCourseDetail, isLoadingGetMyBalance])

    useEffect(() => {
        if (!isLoading) {
            setPlayingVideo(getDefaultPlayedVideo())
        }
    }, [isLoading])

    useEffect(() => {
        if (typeof router.query.slug === 'string') {
            setCourseId(router.query.slug)
            setTimeout(getLearningCourseDetail, 1000)
            getMyBalance({})
        }
    }, [router.query.slug])

    return (
        <LearningCourseContext.Provider
            value={{
                courseDetail,
                isLoading,
                playingVideo,
                handleChangeLecture,
                myAccountBalance,
                currentQuiz,
                isCurrentLessonLearned,
                showPlayQuizModal,
                setShowPlayQuizModal,
                isPerfectScore,
                setIsPerfectScore,
                handlePerfectScore,
            }}
        >
            {children}
        </LearningCourseContext.Provider>
    )
}

export const useLearningCourseContext = () => {
    return useContext(LearningCourseContext) as ILearningCourseContext
}
