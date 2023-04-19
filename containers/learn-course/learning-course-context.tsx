import { LearnerAPI, UserAPI } from '@/api/api-path'
import useAPI from '@/api/hooks/useAPI'
import { UseMutateFunction } from '@tanstack/react-query'
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
    play: boolean
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
    currentLearningId: string
    handleChangeLecture: (pos: number[]) => void
    myAccountBalance: number
    currentQuiz: LectureQuiz | undefined
    isCurrentLessonLearned: boolean
    showPlayQuizModal: boolean
    setShowPlayQuizModal: Dispatch<SetStateAction<boolean>>
    isPerfectScore: boolean
    setIsPerfectScore: Dispatch<SetStateAction<boolean>>
    handlePerfectScore: (isOpen: boolean) => void
    currentPosition: number[]
    getLearningCourseDetail: UseMutateFunction<unknown, any, object, unknown>
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
    const [currentLearningId, setLearningId] = useState<string>('')
    const router = useRouter()

    const [courseDetail, setCourseDetail] = useState<
        LearningCourseRes | undefined
    >(undefined)

    const [currentPosition, setCurrentPosition] = useState<number[]>([0, 0])
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
                getDefaultPlayedVideo(response)
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

    const getDefaultPlayedVideo = (data: LearningCourseRes): void => {
        if (data) {
            let id = ''
            let media = ''
            data.sections.forEach((section, sectionIndex) => {
                section.lessons.forEach((lesson, lessonIndex) => {
                    setCurrentQuiz(lesson.quizzes[0])
                    if (!lesson.learned) {
                        setCurrentPosition([sectionIndex, lessonIndex, 0])
                        setPlayingVideo(lesson.media)
                        setLearningId(lesson._id)
                        return
                    }
                    media = lesson.media
                    id = lesson._id
                })
            })
            setIsCurrentLessonLearned(true)
            setPlayingVideo(media)
            setLearningId(id)
            const numberOfSections = data.sections.length
            setCurrentPosition([
                numberOfSections - 1,
                data.sections[numberOfSections - 1].lessons.length - 1,
                1,
            ])
        } else {
            setPlayingVideo('')
            setLearningId('')
        }
    }

    const handleChangeLecture = (pos: number[]) => {
        setCurrentPosition(pos)
        setCurrentQuiz(
            courseDetail?.sections[pos[0]].lessons[pos[1]].quizzes[0],
        )
        setIsCurrentLessonLearned(
            courseDetail?.sections[pos[0]].lessons[pos[1]].learned ?? false,
        )
        courseDetail &&
            setPlayingVideo(courseDetail.sections[pos[0]].lessons[pos[1]].media)
        courseDetail &&
            setLearningId(courseDetail.sections[pos[0]].lessons[pos[1]]._id)
    }

    const isLoading = useMemo(() => {
        return isLoadingLearningCourseDetail || isLoadingGetMyBalance
    }, [isLoadingLearningCourseDetail, isLoadingGetMyBalance])

    // useEffect(() => {
    //     if (!isLoading) {
    //         setPlayingVideo(getDefaultPlayedVideo())
    //     }
    // }, [isLoading])

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
                currentLearningId,
                handleChangeLecture,
                myAccountBalance,
                currentQuiz,
                isCurrentLessonLearned,
                showPlayQuizModal,
                setShowPlayQuizModal,
                isPerfectScore,
                setIsPerfectScore,
                handlePerfectScore,
                currentPosition,
                getLearningCourseDetail,
            }}
        >
            {children}
        </LearningCourseContext.Provider>
    )
}

export const useLearningCourseContext = () => {
    return useContext(LearningCourseContext) as ILearningCourseContext
}
