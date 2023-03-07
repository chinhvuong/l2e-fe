import { InstructorAPI } from '@/api/api-path'
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
import { getMyCourseDetail } from '@/store/course/selectors'
import { CourseDetail } from '@/store/course/types'
import { UseMutateFunction } from '@tanstack/react-query'
import { ContentState, convertFromHTML, EditorState } from 'draft-js'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

interface ICreateCourseContext {
    isLoading: boolean
    getCourseDetail: UseMutateFunction<unknown, any, object, unknown>
    updateCourse: UseMutateFunction<unknown, any, object, unknown>
    upsertSections: UseMutateFunction<unknown, any, object, unknown>
    courseDetail: CourseDetail
    courseSections: CurriculumSection[]
    courseLectures: CurriculumLecture[][]
}

export const CreateCourseContext = createContext<ICreateCourseContext>(
    {} as ICreateCourseContext,
)

export const CreateCourseProvider: React.FC<React.PropsWithChildren<{}>> = ({
    children,
}) => {
    const dispatch = useAppDispatch()
    const courseDetail = useAppSelector(getMyCourseDetail)
    const courseSections = useAppSelector(getCurriculumSectionsForm)
    const courseLectures = useAppSelector(getCurriculumLecturesForm)
    const [courseId, setCourseId] = useState('')
    const [isLoadingCurriculum, setIsLoadingCurriculum] = useState(false)

    const { mutate: updateCourse, isLoading: isLoadingUpdateCourse } =
        useAPI.put(InstructorAPI.UPDATE_COURSE + courseDetail._id, {
            onError: () => {},
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
                onError: () => {},
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

    const handleGetLessons = async (sectionId: string) => {
        await callAPI(
            'get',
            InstructorAPI.GET_LESSONS + '?sectionId=' + sectionId,
            {},
        ).then((response) => {
            dispatch(updateAllCurriculumLectures([...response.data]))
        })
    }

    const { mutate: getSections, isLoading: isLoadingGetSections } =
        useAPI.getMutation(
            InstructorAPI.GET_SECTIONS + '?courseId=' + courseId,
            {
                onError: () => {},
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
                    setIsLoadingCurriculum(false)
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
                el.sectionId = sectionId
                return el
            }),
        )
    }

    const { mutate: upsertSections, isLoading: isLoadingUpsertSections } =
        useAPI.post(InstructorAPI.UPSERT_SECTIONS + courseId, {
            onError: () => {},
            onSuccess: (response) => {
                setIsLoadingCurriculum(true)
                response.forEach((section: any, index: number) => {
                    handleUpsertLessons(section._id, courseLectures[index])
                })
                setIsLoadingCurriculum(false)
            },
        })

    useEffect(() => {
        if (courseId !== localStorage.getItem(COURSE_ID)) {
            setCourseId(localStorage.getItem(COURSE_ID) ?? '')
        } else if (localStorage.getItem(COURSE_ID) !== null) {
            getCourseDetail({})
        }
    }, [courseId])

    const isLoading = useMemo(() => {
        return (
            isLoadingUpdateCourse ||
            isLoadingGetCourseDetail ||
            isLoadingGetSections ||
            isLoadingUpsertSections ||
            isLoadingCurriculum
        )
    }, [
        isLoadingUpdateCourse,
        isLoadingGetCourseDetail,
        isLoadingGetSections,
        isLoadingUpsertSections,
        isLoadingCurriculum,
    ])

    return (
        <CreateCourseContext.Provider
            value={{
                isLoading,
                getCourseDetail,
                updateCourse,
                upsertSections,
                courseDetail,
                courseSections,
                courseLectures,
            }}
        >
            {children}
        </CreateCourseContext.Provider>
    )
}

export const useCreateCourseContext = () => {
    return useContext(CreateCourseContext) as ICreateCourseContext
}
