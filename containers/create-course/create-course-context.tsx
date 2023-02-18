import { InstructorAPI } from '@/api/api-path'
import useAPI from '@/api/hooks/useAPI'
import { COURSE_ID } from '@/constants/localStorage'
import { useAppDispatch, useAppSelector } from '@/hooks'
import {
    updateCourseDetail,
    updateGetCourseDetailState,
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
import { CurriculumSection } from '@/store/course/curriculum/types'
import {
    updateAllRequirements,
    updateAllWhatYouWillLearn,
} from '@/store/course/intended-learners'
import { getMyCourseDetail } from '@/store/course/selectors'
import { CourseDetail } from '@/store/course/types'
import { UseMutateFunction } from '@tanstack/react-query'
import { noop } from 'lodash'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

interface ICreateCourseContext {
    isLoading: boolean
    updateCourse: UseMutateFunction<unknown, any, object, unknown>
    upsertSections: UseMutateFunction<unknown, any, object, unknown>
    courseDetail: CourseDetail
    courseSections: CurriculumSection[]
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
    const [sectionId, setSectionId] = useState('')

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
                    dispatch(updateGetCourseDetailState(true))
                    // dispatch(updateAllCurriculumLectures([]))
                    getSections({})
                },
            },
        )

    const { mutate: getSections, isLoading: isLoadingGetSections } =
        useAPI.getMutation(
            InstructorAPI.GET_SECTIONS + '?courseId=' + courseId,
            {
                onError: () => {},
                onSuccess: (response) => {
                    const sectionsBasicInfo: CurriculumSection[] = []
                    response.data.forEach((item: CurriculumSection) => {
                        sectionsBasicInfo.push({
                            _id: item._id,
                            courseId: item.courseId,
                            name: item.name,
                            description: item.description,
                        })
                        setSectionId(item._id)
                        setTimeout(getLessons, 1000)
                    })

                    dispatch(updateAllCurriculumSections(sectionsBasicInfo))
                },
            },
        )

    const { mutate: upsertSections, isLoading: isLoadingUpsertSections } =
        useAPI.post(InstructorAPI.UPSERT_SECTIONS + courseId, {
            onError: () => {},
            onSuccess: (response) => {
                courseLectures.forEach((item, index) => {
                    setSectionId(response[index]._id)
                    setTimeout(
                        () =>
                            upsertLessons(
                                item.map((item) => {
                                    const el: any = { ...item }
                                    delete el._id
                                    el.sectionId = response[index]._id
                                    return el
                                }),
                            ),
                        1000,
                    )
                })
            },
        })

    const { mutate: upsertLessons, isLoading: isLoadingUpsertLessons } =
        useAPI.post(InstructorAPI.UPSERT_LESSONS + sectionId, {
            onError: () => {},
            onSuccess: () => {},
        })

    const { mutate: getLessons, isLoading: isLoadingGetLessons } =
        useAPI.getMutation(
            InstructorAPI.GET_LESSONS + '?sectionId=' + sectionId,
            {
                onSuccess(response) {
                    dispatch(updateAllCurriculumLectures([...response.data]))
                },
                onError: noop,
            },
        )

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
            isLoadingUpsertLessons ||
            isLoadingGetLessons ||
            isLoadingUpsertLessons
        )
    }, [
        isLoadingUpdateCourse,
        isLoadingGetCourseDetail,
        isLoadingGetSections,
        isLoadingUpsertSections,
        isLoadingGetLessons,
        isLoadingUpsertLessons,
    ])

    return (
        <CreateCourseContext.Provider
            value={{
                isLoading,
                updateCourse,
                upsertSections,
                courseDetail,
                courseSections,
            }}
        >
            {children}
        </CreateCourseContext.Provider>
    )
}

export const useCreateCourseContext = () => {
    return useContext(CreateCourseContext) as ICreateCourseContext
}
