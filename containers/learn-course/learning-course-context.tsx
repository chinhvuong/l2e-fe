import { LearnerAPI } from '@/api/api-path'
import useAPI from '@/api/hooks/useAPI'
import { useRouter } from 'next/router'
import {
    createContext,
    Dispatch,
    SetStateAction,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react'

export interface LearningCourseLectures {
    _id: string
    name: string
    description: string
    media: string
    mediaName: string
    mediaType: string
    quizzes: string[]
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
    setPlayingVideo: Dispatch<SetStateAction<string>>
}

export const LearningCourseContext = createContext<ILearningCourseContext>(
    {} as ILearningCourseContext,
)

export const LearningCourseProvider: React.FC<React.PropsWithChildren<{}>> = ({
    children,
}) => {
    const [courseId, setCourseId] = useState('')
    const [playingVideo, setPlayingVideo] = useState<string>('')
    const router = useRouter()

    const [courseDetail, setCourseDetail] = useState<
        LearningCourseRes | undefined
    >(undefined)

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

    useEffect(() => {
        if (typeof router.query.slug === 'string') {
            setCourseId(router.query.slug)
            setTimeout(getLearningCourseDetail, 1000)
        }
    }, [router.query.slug])

    const isLoading = useMemo(() => {
        return isLoadingLearningCourseDetail
    }, [isLoadingLearningCourseDetail])

    return (
        <LearningCourseContext.Provider
            value={{
                courseDetail,
                isLoading,
                playingVideo,
                setPlayingVideo,
            }}
        >
            {children}
        </LearningCourseContext.Provider>
    )
}

export const useLearningCourseContext = () => {
    return useContext(LearningCourseContext) as ILearningCourseContext
}
