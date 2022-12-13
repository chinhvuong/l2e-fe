import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Router, { useRouter } from 'next/router'
import Button from '@/components/core/button'
import { useCourse } from '@/api/hooks/useCourse'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { getMyCourseDetail } from '@/store/course/selectors'
import {
    updateCourseDetail,
    updateGetCourseDetailState,
    updateSaveCourseState,
} from '@/store/course'
import { useEffect, useState } from 'react'
import {
    updateAllRequirements,
    updateAllWhatYouWillLearn,
} from '@/store/course/intended-learners'
import {
    updateAllCurriculumLectures,
    updateAllCurriculumSections,
} from '@/store/course/curriculum'
import {
    CurriculumLecture,
    CurriculumSection,
} from '@/store/course/curriculum/types'
import { COURSE_ID } from '@/constants/localStorage'
import { callAPI } from '@/api/axios-client'
import { apiPath } from '@/api/api-path'
import { LessonResponseItem } from '@/api/dto/course.dto'
import {
    getCurriculumLecturesForm,
    getCurriculumSectionsForm,
} from '@/store/course/curriculum/selectors'

export interface IHeaderProps {}

export default function Header() {
    const dispatch = useAppDispatch()
    const courseDetail = useAppSelector(getMyCourseDetail)
    const courseSections = useAppSelector(getCurriculumSectionsForm)
    const courseLectures = useAppSelector(getCurriculumLecturesForm)
    const router = useRouter()
    const [courseId, setCourseId] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const {
        useGetMyCourseDetail,
        useUpdateCourse,
        useGetSections,
        useUpsertSections,
        useUpsertLessons,
    } = useCourse()
    const { mutate: updateCourse } = useUpdateCourse({
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
            setIsLoading(false)
            dispatch(updateSaveCourseState(true))
        },
    })
    const { refetch: refetchCourseDetail } = useGetMyCourseDetail(courseId, {
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
            setIsLoading(false)
            dispatch(updateAllCurriculumLectures([]))
            refetchSections()
        },
    })
    const { refetch: refetchSections } = useGetSections(courseId, {
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
                getLessons(item._id)
            })

            dispatch(updateAllCurriculumSections(sectionsBasicInfo))
        },
    })
    const { mutate: upsertSections } = useUpsertSections({
        onError: () => {},
        onSuccess: (response) => {
            courseLectures.forEach((item, index) =>
                upsertLessons(
                    item.map((item) => {
                        const el: any = { ...item }
                        delete el._id
                        el.sectionId = response[index]._id
                        return el
                    }),
                ),
            )
        },
    })
    const { mutate: upsertLessons } = useUpsertLessons({
        onError: () => {},
        onSuccess: () => {},
    })

    const getLessons = async (sectionId: string) => {
        await callAPI(
            'get',
            apiPath.GET_LESSONS + '?sectionId=' + sectionId,
            {},
        )
            .then((response) => {
                dispatch(updateAllCurriculumLectures([...response.data]))
            })
            .catch((er) => console.log(er))
    }

    useEffect(() => {
        if (courseId !== localStorage.getItem(COURSE_ID)) {
            setCourseId(localStorage.getItem(COURSE_ID) ?? '')
        } else if (localStorage.getItem(COURSE_ID) !== null) {
            refetchCourseDetail()
        }
    }, [courseId])

    const goBack = () => {
        Router.push('/instructor')
    }

    const handleUpdateCourseDetail = () => {
        if (!isLoading) {
            setIsLoading(true)
            updateCourse(courseDetail)
            upsertSections(
                courseSections.map((item) => {
                    const el: any = { ...item }
                    delete el._id
                    return el
                }),
            )
        }
    }

    return (
        <div className="flex items-center justify-between bg-black h-[65px] w-full fixed top-0 z-10 px-5">
            <div
                className="flex items-center space-x-3 cursor-pointer"
                onClick={() => goBack()}
            >
                <FontAwesomeIcon
                    icon={faChevronLeft}
                    className="text-xl bg-black text-white"
                />
                <div className="text-white">Back</div>
            </div>
            <Button
                isLoading={isLoading}
                onClick={() => handleUpdateCourseDetail()}
            >
                <div className="font-semibold">Save</div>
            </Button>
        </div>
    )
}
