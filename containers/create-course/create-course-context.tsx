import { InstructorAPI, UserAPI } from '@/api/api-path'
import { callAPI } from '@/api/axios-client'
import useAPI from '@/api/hooks/useAPI'
import { COURSE_ID } from '@/constants/localStorage'
import { useAppDispatch, useAppSelector } from '@/hooks'
import {
    updateCourseDetail,
    updateDescriptionLength,
    updateSaveCourseState,
} from '@/store/course'
import {
    updateAllCurriculumLectures,
    updateAllCurriculumSections,
} from '@/store/course/curriculum'
import {
    getCurriculumLecturesForm,
    getCurriculumSectionsForm,
} from '@/store/course/curriculum/selectors'
import {
    CurriculumLecture,
    CurriculumSection,
} from '@/store/course/curriculum/types'
import {
    updateAllRequirements,
    updateAllWhatYouWillLearn,
} from '@/store/course/intended-learners'
import { getQuestionDetailInfo } from '@/store/course/question/selectors'
import {
    getFinalTestSelection,
    getMyCourseDetail,
} from '@/store/course/selectors'
import { CourseDetail } from '@/store/course/types'
import { UpdateAllQuestionState } from '@/store/questions'
import { getQuestionsInfo } from '@/store/questions/selectors'
import { QuestionDetailType } from '@/store/questions/types'
import { UpdateQuizzesState } from '@/store/quiz'
import { getQuizDetailInfo, getQuizzez } from '@/store/quiz/selectors'
import { QuizDetailType, QuizSelectType } from '@/store/quiz/types'
import {
    updateGlobalLoadingState,
    updateUserBioLength,
    updateUserInfo,
} from '@/store/user'
import { UseMutateFunction } from '@tanstack/react-query'
import { ContentState, EditorState, convertFromHTML } from 'draft-js'
import { noop } from 'lodash'
import { useRouter } from 'next/router'
import {
    Dispatch,
    SetStateAction,
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react'
interface ICreateCourseContext {
    getCourseDetail: UseMutateFunction<unknown, any, object, unknown>
    updateCourse: UseMutateFunction<unknown, any, object, unknown>
    upsertSections: UseMutateFunction<unknown, any, object, unknown>
    getQuestionsList: UseMutateFunction<unknown, any, object, unknown>
    getQuizzesList: UseMutateFunction<unknown, any, object, unknown>
    courseDetail: CourseDetail
    courseSections: CurriculumSection[]
    courseLectures: CurriculumLecture[][]
    questionListsDetail: QuestionDetailType[]
    quizzezDetail: QuizDetailType[]
    quizDetail: QuizDetailType
    questionDetail: QuestionDetailType
    chosenFinalTest: QuizSelectType
    setSearchQuestions: Dispatch<SetStateAction<string>>
    setSearchQuizzes: Dispatch<SetStateAction<string>>
    setPageNumberQuestions: Dispatch<SetStateAction<number>>
    setPageNumberQuizzes: Dispatch<SetStateAction<number>>
    totalPageQuestions: number
    totalPageQuizzes: number
    currentTab: string
    setCurrentTab: Dispatch<SetStateAction<string>>
    updateProfile: UseMutateFunction<unknown, any, object, unknown>
}

export const CreateCourseContext = createContext<ICreateCourseContext>(
    {} as ICreateCourseContext,
)

export const CreateCourseProvider: React.FC<React.PropsWithChildren<{}>> = ({
    children,
}) => {
    const dispatch = useAppDispatch()
    const courseDetail = useAppSelector(getMyCourseDetail)
    const chosenFinalTest = useAppSelector(getFinalTestSelection)
    const courseSections = useAppSelector(getCurriculumSectionsForm)
    const courseLectures = useAppSelector(getCurriculumLecturesForm)
    const [courseId, setCourseId] = useState('')
    const [isLoadingCurriculum, setIsLoadingCurriculum] = useState(false)
    const questionListsDetail = useAppSelector(getQuestionsInfo)
    const quizzezDetail = useAppSelector(getQuizzez)
    const quizDetail = useAppSelector(getQuizDetailInfo)
    const questionDetail = useAppSelector(getQuestionDetailInfo)
    const [searchQuestions, setSearchQuestions] = useState('')
    const [pageNumberQuestions, setPageNumberQuestions] = useState(1)
    const [searchQuizzes, setSearchQuizzes] = useState('')
    const [pageNumberQuizzes, setPageNumberQuizzes] = useState(1)
    const limit = 10
    const [totalPageQuestions, setTotalPageQuestions] = useState(1)
    const [totalPageQuizzes, setTotalPageQuizzes] = useState(1)
    const router = useRouter()
    const [currentTab, setCurrentTab] = useState(() => {
        const list = router.route.split('/')
        return list[list.length - 1]
    })

    const changeURLQuestions = () => {
        const newQuery: any = {}
        newQuery.page = setSearchQuestions
        newQuery.limit = limit
        if (searchQuestions !== '') {
            newQuery.query = searchQuestions
        }
        router.push(
            {
                pathname: router.pathname.replace('[slug]', courseId),
                query: newQuery,
            },
            undefined,
            { shallow: true },
        )
    }

    const changeURLQuizzes = () => {
        const newQuery: any = {}
        newQuery.page = setSearchQuizzes
        newQuery.limit = limit
        if (searchQuizzes !== '') {
            newQuery.query = searchQuizzes
        }
        router.push(
            {
                pathname: router.pathname.replace('[slug]', courseId),
                query: newQuery,
            },
            undefined,
            { shallow: true },
        )
    }

    const { mutate: updateCourse, isLoading: isLoadingUpdateCourse } =
        useAPI.put(InstructorAPI.UPDATE_COURSE + courseDetail._id, {
            onError: noop,
            onSuccess: (response) => {
                dispatch(updateCourseDetail(response))
                if (response?.goals && response.goals.length > 0) {
                    let newList: string[] = [...response.goals]
                    const emptyList = Array(4).fill('')
                    if (newList.length < 4) {
                        newList = [...newList, ...emptyList]
                        newList = [...newList.slice(0, 4)]
                    }
                    dispatch(updateAllWhatYouWillLearn(newList))
                }
                response?.requirements &&
                    response.requirements.length > 0 &&
                    dispatch(updateAllRequirements(response.requirements))
                dispatch(updateSaveCourseState(true))
            },
        })

    const { mutate: getCourseDetail, isLoading: isLoadingGetCourseDetail } =
        useAPI.getMutation(
            InstructorAPI.GET_MY_COURSE_DETAIL + courseId + '?id=' + courseId,
            {
                onError: noop,
                onSuccess: (response) => {
                    dispatch(updateCourseDetail(response))
                    if (response?.goals && response.goals.length > 0) {
                        let newList: string[] = [...response.goals]
                        const emptyList = Array(4).fill('')
                        if (newList.length < 4) {
                            newList = [...newList, ...emptyList]
                            newList = [...newList.slice(0, 4)]
                        }
                        dispatch(updateAllWhatYouWillLearn(newList))
                    }
                    response?.requirements &&
                        response.requirements.length > 0 &&
                        dispatch(updateAllRequirements(response.requirements))
                    dispatch(
                        updateDescriptionLength(
                            EditorState.createWithContent(
                                ContentState.createFromBlockArray(
                                    convertFromHTML(response.description)
                                        .contentBlocks,
                                ),
                            )
                                .getCurrentContent()
                                .getPlainText()
                                .split(/(\s+)/)
                                .filter((e) => e.trim().length > 0).length,
                        ),
                    )
                    getSections({})
                },
            },
        )
    const { mutate: getQuizzesList, isLoading: isLoadingQuizzesList } =
        useAPI.getMutation(
            `${InstructorAPI.GET_QUIZZES}?courseId=${courseId}&page=${
                pageNumberQuizzes - 1
            }&limit=${limit}${
                searchQuizzes !== '' ? '&query=' + searchQuizzes : ''
            }`,
            {
                onError: noop,
                onSuccess: (response) => {
                    dispatch(UpdateQuizzesState(response?.data))
                    setTotalPageQuizzes(Math.ceil(response.total / limit))
                },
            },
        )
    const { mutate: getQuestionsList, isLoading: isLoadingQuestionsList } =
        useAPI.getMutation(
            `${InstructorAPI.GET_QUESTIONS}?courseId=${courseId}&page=${
                pageNumberQuestions - 1
            }&limit=${limit}${
                searchQuestions !== '' ? '&query=' + searchQuestions : ''
            }`,
            {
                onError: noop,
                onSuccess: (response) => {
                    dispatch(UpdateAllQuestionState(response?.data))
                    setTotalPageQuestions(Math.ceil(response.total / limit))
                },
            },
        )
    const handleGetLessons = async (sectionId: string) => {
        await callAPI(
            'get',
            InstructorAPI.GET_LESSONS + '?sectionId=' + sectionId,
            {},
        )
            .then((response) => {
                dispatch(
                    updateAllCurriculumLectures([
                        ...response.data.map((item: any) => {
                            return {
                                ...item,
                                isLoading: false,
                            }
                        }),
                    ]),
                )
                setIsLoadingCurriculum(false)
            })
            .catch(() => {
                setIsLoadingCurriculum(false)
            })
    }

    const { mutate: getSections, isLoading: isLoadingGetSections } =
        useAPI.getMutation(
            InstructorAPI.GET_SECTIONS + '?courseId=' + courseId,
            {
                onError: noop,
                onSuccess: (response) => {
                    setIsLoadingCurriculum(true)
                    const sectionsBasicInfo: CurriculumSection[] = []
                    response.data.forEach((item: CurriculumSection) => {
                        sectionsBasicInfo.push({
                            _id: item._id,
                            courseId: item.courseId,
                            name: item.name,
                            description: item.description,
                        })
                        handleGetLessons(item._id)
                    })
                    dispatch(updateAllCurriculumSections(sectionsBasicInfo))
                },
            },
        )

    const handleUpsertLessons = async (
        sectionId: string,
        lectures: CurriculumLecture[],
    ) => {
        await callAPI(
            'post',
            InstructorAPI.UPSERT_LESSONS + sectionId,
            lectures.map((item) => {
                const el: any = { ...item }
                delete el._id
                delete el.isLoading
                el.sectionId = sectionId
                return el
            }),
        ).finally(() => setIsLoadingCurriculum(false))
    }

    const { mutate: upsertSections, isLoading: isLoadingUpsertSections } =
        useAPI.post(InstructorAPI.UPSERT_SECTIONS + courseId, {
            onError: noop,
            onSuccess: (response) => {
                setIsLoadingCurriculum(true)
                response.forEach((section: any, index: number) => {
                    handleUpsertLessons(section._id, courseLectures[index])
                })
                setIsLoadingCurriculum(false)
            },
        })

    const { mutate: getUserInfo, isLoading: isLoadingGetUserInfo } =
        useAPI.getMutation(UserAPI.GET_USER_INFO, {
            onError: noop,
            onSuccess(response) {
                dispatch(updateUserInfo(response))
                dispatch(
                    updateUserBioLength(
                        EditorState.createWithContent(
                            ContentState.createFromBlockArray(
                                convertFromHTML(response.bio).contentBlocks,
                            ),
                        )
                            .getCurrentContent()
                            .getPlainText()
                            .split(/(\s+)/)
                            .filter((e) => e.trim().length > 0).length,
                    ),
                )
            },
        })

    const { mutate: updateProfile, isLoading: isLoadingUpdateProfile } =
        useAPI.put(UserAPI.GET_USER_INFO, {
            onError: noop,
            onSuccess: noop,
        })

    useEffect(() => {
        if (courseId !== localStorage.getItem(COURSE_ID)) {
            setCourseId(localStorage.getItem(COURSE_ID) ?? '')
        } else {
            if (localStorage.getItem(COURSE_ID)) {
                getCourseDetail({})
                getUserInfo({})
            }
        }
    }, [courseId])

    useEffect(() => {
        if (courseId !== localStorage.getItem(COURSE_ID)) {
            setCourseId(localStorage.getItem(COURSE_ID) ?? '')
        } else {
            if (localStorage.getItem(COURSE_ID)) {
                getQuestionsList({})
                if (router.pathname.includes('question')) {
                    changeURLQuestions()
                }
            }
        }
    }, [searchQuestions, pageNumberQuestions, courseId, router.pathname])

    useEffect(() => {
        if (courseId !== localStorage.getItem(COURSE_ID)) {
            setCourseId(localStorage.getItem(COURSE_ID) ?? '')
        } else {
            if (localStorage.getItem(COURSE_ID)) {
                getQuizzesList({})
                if (router.pathname.includes('quiz')) {
                    changeURLQuizzes()
                }
            }
        }
    }, [searchQuizzes, pageNumberQuizzes, courseId, router.pathname])

    useEffect(() => {
        dispatch(
            updateGlobalLoadingState(
                isLoadingUpdateCourse ||
                    isLoadingGetCourseDetail ||
                    isLoadingGetSections ||
                    isLoadingUpsertSections ||
                    isLoadingCurriculum ||
                    isLoadingQuizzesList ||
                    isLoadingQuestionsList ||
                    isLoadingGetUserInfo ||
                    isLoadingUpdateProfile,
            ),
        )
    }, [
        isLoadingUpdateCourse,
        isLoadingGetCourseDetail,
        isLoadingGetSections,
        isLoadingUpsertSections,
        isLoadingCurriculum,
        isLoadingQuizzesList,
        isLoadingQuestionsList,
        isLoadingGetUserInfo,
        isLoadingUpdateProfile,
    ])

    return (
        <CreateCourseContext.Provider
            value={{
                getCourseDetail,
                updateCourse,
                upsertSections,
                getQuizzesList,
                getQuestionsList,
                courseDetail,
                courseSections,
                courseLectures,
                questionListsDetail,
                quizzezDetail,
                quizDetail,
                questionDetail,
                chosenFinalTest,
                setSearchQuestions,
                setSearchQuizzes,
                setPageNumberQuestions,
                setPageNumberQuizzes,
                totalPageQuestions,
                totalPageQuizzes,
                currentTab,
                setCurrentTab,
                updateProfile,
            }}
        >
            {children}
        </CreateCourseContext.Provider>
    )
}

export const useCreateCourseContext = () => {
    return useContext(CreateCourseContext) as ICreateCourseContext
}
