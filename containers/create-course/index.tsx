import { LessonResponseItem, SectionResponseItem } from '@/api/dto/course.dto'
import { useCourse } from '@/api/hooks/useCourse'
import Button from '@/components/core/button'
import { Category } from '@/constants/interfaces'
import {
    CATEGORY,
    CATEGORY_NAME_LIST,
    COURSE_ID,
} from '@/constants/localStorage'
import { useAppDispatch } from '@/hooks'
import Logo from '@/layout/main-layout/header/logo'
import {
    updateCanCreateCourseState,
    updateCourseDetail,
    updateCreatingCourseState,
} from '@/store/course'
import {
    CurriculumLecture,
    CurriculumSection,
} from '@/store/course/curriculum/types'
import {
    updateAllRequirements,
    updateAllWhatYouWillLearn,
} from '@/store/course/intended-learners'
import { convertToCategoryID } from '@/utils'
import Router from 'next/router'
import { useState } from 'react'
import CourseCategory from './components/create-course-step/course-category'
import CourseTitle from './components/create-course-step/course-title'
import CourseType from './components/create-course-step/course-type'

export interface ICourseBasicCreateContainerProps {}

export default function CourseBasicCreateContainer() {
    const step = 3
    const [currentStep, setCurrentStep] = useState(1)
    const [stepBarWidth, setStepBarWidth] = useState({
        width: (currentStep / step) * 100 + '%',
    })

    const [courseName, setCourseName] = useState('')
    const [courseCategory, setCourseCategory] = useState('')
    const [courseCategoryList, setCourseCategoryList] = useState<string[]>([])
    const [courseId, setCourseId] = useState<string>('')

    const dispatch = useAppDispatch()

    const { useCreateCourse, useUpsertSections, useUpsertLessons } = useCourse()
    const { mutate: createCourse } = useCreateCourse({
        onError: () => {},
        onSuccess: (response) => {
            dispatch(updateCourseDetail(response))
            response?.goals &&
                response.goals.length > 0 &&
                dispatch(updateAllWhatYouWillLearn(response.goals))
            response?.requirements &&
                response.requirements.length > 0 &&
                dispatch(updateAllRequirements(response.requirements))
            localStorage.setItem(COURSE_ID, response._id)
            setCourseId(response._id)
            upsertSections([
                {
                    name: '',
                    description: '',
                    courseId: response._id,
                },
            ])
            Router.push(`/create-course/${response._id}/landing-page`)
        },
    })

    const { mutate: upsertSections } = useUpsertSections({
        onError: () => {},
        onSuccess: (response) => {
            const sectionsBasicInfo: CurriculumSection[] = []
            response.forEach((item: SectionResponseItem) => {
                sectionsBasicInfo.push({
                    _id: item._id,
                    courseId: courseId,
                    name: item.name,
                    description: item.description,
                })
                upsertLessons([
                    {
                        name: '',
                        description: '',
                        media: '',
                        mediaType: '',
                        quizzes: [],
                        sectionId: item._id,
                    },
                ])
            })
        },
    })

    const { mutate: upsertLessons } = useUpsertLessons({
        onError: () => {},
        onSuccess: (response) => {
            const lessonsBasicInfo: CurriculumLecture[] = []
            response.forEach((item: LessonResponseItem) => {
                lessonsBasicInfo.push({
                    name: item.name,
                    description: item.description,
                    media: item.media,
                    mediaType: item.mediaType,
                    quizzes: item.quizzes,
                    _id: item._id,
                    sectionId: item.sectionId,
                    mode: item.mode,
                })
            })
        },
    })

    const { useGetCategory } = useCourse()
    const { data, isFetching } = useGetCategory({
        onError: () => {},
        onSuccess: (response) => {
            if (response?.data) {
                const category = response.data.map(
                    (item: Category) => item.name,
                )
                setCourseCategoryList(category)
                localStorage.setItem(CATEGORY, JSON.stringify(response.data))
                localStorage.setItem(
                    CATEGORY_NAME_LIST,
                    JSON.stringify(category),
                )
            }
        },
    })

    const backStep = () => {
        if (currentStep !== 1) {
            const back = currentStep - 1
            if (back >= 1) {
                setCurrentStep(back)
                setStepBarWidth({
                    width: (back / step) * 100 + '%',
                })
            }
        } else {
            Router.back()
        }
    }

    const validateCurrentStep = () => {
        if (currentStep === 1) {
            dispatch(updateCanCreateCourseState(true))
            return true
        }
        if (currentStep === 2 && courseName !== '') {
            dispatch(updateCanCreateCourseState(true))
            return true
        }
        if (currentStep === 3 && courseCategory !== '') {
            dispatch(updateCanCreateCourseState(true))
            return true
        }
        dispatch(updateCanCreateCourseState(false))
        return false
    }

    const nextStep = () => {
        if (!validateCurrentStep()) {
            return
        }

        if (currentStep !== step) {
            const next = currentStep + 1
            if (next <= step) {
                setCurrentStep(next)
                setStepBarWidth({
                    width: (next / step) * 100 + '%',
                })
            }
        } else {
            if (courseName !== '' && courseCategory !== '') {
                dispatch(updateCreatingCourseState(true))
                createCourse({
                    name: courseName,
                    category: convertToCategoryID(data?.data, courseCategory),
                })
            }
        }
    }

    const updateCourseName = (value: string) => {
        setCourseName(value)
    }

    const getStepContent = () => {
        if (currentStep === 1) {
            return <CourseType />
        } else if (currentStep === 2) {
            return (
                <CourseTitle
                    setTitle={updateCourseName}
                    defaultValue={courseName}
                />
            )
        } else if (currentStep === 3) {
            return (
                <CourseCategory
                    setCategory={setCourseCategory}
                    selected={courseCategory}
                    categoryItemList={courseCategoryList}
                    isLoading={isFetching}
                />
            )
        }
    }

    return (
        <div>
            <div className="flex justify-between items-center h-[100px] px-7">
                <div className="w-[200px]">
                    <Button
                        className="btn-primary-outline"
                        onClick={() => backStep()}
                    >
                        {currentStep !== 1 ? <div>Back</div> : <div>Exit</div>}
                    </Button>
                </div>
                <div className="flex items-center">
                    <Logo darkTheme={false} imgClass="w-3/4" />
                    <div className="border-l-2 px-6 text-xl">
                        Step {currentStep} of {step}
                    </div>
                </div>
                <div className="w-[200px] flex justify-end">
                    <Button onClick={() => nextStep()}>
                        {currentStep === step ? (
                            <div>Create course</div>
                        ) : (
                            <div>Next</div>
                        )}
                    </Button>
                </div>
            </div>
            <div className="flex items-center justify-between w-full bg-border-box rounded-full">
                <div
                    className="h-2 rounded-full bg-primary transition-all duration-200"
                    style={stepBarWidth}
                ></div>
            </div>
            {getStepContent()}
        </div>
    )
}
