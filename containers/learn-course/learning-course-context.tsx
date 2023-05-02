import { LearnerAPI, UserAPI } from '@/api/api-path'
import useAPI from '@/api/hooks/useAPI'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { UpdateCommentsState } from '@/store/comment'
import { UseMutateFunction } from '@tanstack/react-query'
import { noop } from 'lodash'
import { useRouter } from 'next/router'
import { Comment } from '@/store/comment/types'
import {
    Dispatch,
    SetStateAction,
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react'
import { getComments } from '@/store/comment/selectors'
import { LESSON_ID } from '@/constants/localStorage'
import { UpdateRatingsState } from '@/store/rating'
import { getRatings } from '@/store/rating/selectors'
import { Rating } from '@/store/rating/types'
import { useAccount } from 'wagmi'

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
    getRatingCourseDetail: UseMutateFunction<unknown, any, object, unknown>
    createRatingDetail: UseMutateFunction<unknown, any, object, unknown>
    courseId: string
    ratings: Rating[]
    canRating: boolean
    setCanRating: React.Dispatch<React.SetStateAction<boolean>>
    currentTab: string
    setCurrentTab: Dispatch<SetStateAction<string>>
}

export const LearningCourseContext = createContext<ILearningCourseContext>(
    {} as ILearningCourseContext,
)

export const LearningCourseProvider: React.FC<React.PropsWithChildren<{}>> = ({
    children,
}) => {
    const { address } = useAccount()
    const [canRating, setCanRating] = useState(true)
    const ratings = useAppSelector(getRatings)
    const dispatch = useAppDispatch()
    const [courseId, setCourseId] = useState('')
    const [playingVideo, setPlayingVideo] = useState<string>('')
    const [myAccountBalance, setMyAccountBalance] = useState(0)
    const [showPlayQuizModal, setShowPlayQuizModal] = useState(false)
    const [currentTab, setCurrentTab] = useState('Overview')
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
    const validateRating = (ratings: Rating[]) => {
        if (canRating) {
            ratings.forEach((rating) => {
                if (
                    rating.user.walletAddress.toLowerCase() ===
                    String(address).toLowerCase()
                ) {
                    setCanRating(false)
                }
            })
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
                if (playingVideo === '') {
                    getDefaultPlayedVideo(response)
                }
            },
        },
    )

    const {
        mutate: getRatingCourseDetail,
        isLoading: isLoadingRatingCourseDetail,
    } = useAPI.getMutation(LearnerAPI.RATING + '?course=' + courseId, {
        onError: () => {},
        onSuccess: (response) => {
            dispatch(UpdateRatingsState(response.data))
            validateRating(response.data)
        },
    })

    const { mutate: createRatingDetail, isLoading: isLoadingCreateRating } =
        useAPI.post(LearnerAPI.CREATE_RATING, {
            onError: () => {},
            onSuccess: (response) => {
                // getRatingCourseDetail({})
            },
        })

    const { mutate: getMyBalance, isLoading: isLoadingGetMyBalance } =
        useAPI.getMutation(UserAPI.GET_MY_BALANCE, {
            onError: noop,
            onSuccess: (response) => {
                setMyAccountBalance(response.balance)
            },
        })

    const getDefaultPlayedVideo = (data: LearningCourseRes): void => {
        if (data) {
            let lessonId = ''
            let isFinishLearning = true
            data.sections.forEach((section, sectionIndex) => {
                section.lessons.forEach((lesson, lessonIndex) => {
                    if (!lesson.learned && isFinishLearning) {
                        setCurrentQuiz(lesson.quizzes[0])
                        setCurrentPosition([sectionIndex, lessonIndex, 0])
                        lessonId = lesson._id
                        setPlayingVideo(lesson.media)
                        isFinishLearning = false
                    }
                })
            })
            if (isFinishLearning) {
                const lastSectionIndex = data.sections.length - 1
                const lastLessonIndex =
                    data.sections[lastSectionIndex].lessons.length - 1
                const lastLessonOfLastSection =
                    data.sections[lastSectionIndex].lessons[lastLessonIndex]
                setCurrentQuiz(lastLessonOfLastSection.quizzes[0])
                setCurrentPosition([lastSectionIndex, lastLessonIndex, 1])
                setIsCurrentLessonLearned(lastLessonOfLastSection.learned)
                lessonId = lastLessonOfLastSection._id
                setPlayingVideo(lastLessonOfLastSection.media)
            }
            localStorage.setItem(LESSON_ID, lessonId)
        } else {
            setPlayingVideo('')
        }
    }
    const handleChangeLecture = (pos: number[]) => {
        setCurrentPosition([...pos, currentPosition[2]])
        const newLecture = courseDetail?.sections[pos[0]].lessons[pos[1]]
        if (newLecture) {
            setCurrentQuiz(newLecture.quizzes[0])
            setIsCurrentLessonLearned(newLecture.learned ?? false)
            setPlayingVideo(newLecture.media)
            localStorage.setItem(LESSON_ID, newLecture._id)
        }
        setCurrentTab('Overview')
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
            setTimeout(getRatingCourseDetail, 1000)
            getMyBalance({})
        }
    }, [router.query.slug])

    return (
        <LearningCourseContext.Provider
            value={{
                ratings,
                canRating,
                setCanRating,
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
                currentPosition,
                getLearningCourseDetail,
                getRatingCourseDetail,
                createRatingDetail,
                courseId,
                currentTab,
                setCurrentTab,
            }}
        >
            {children}
        </LearningCourseContext.Provider>
    )
}

export const useLearningCourseContext = () => {
    return useContext(LearningCourseContext) as ILearningCourseContext
}
