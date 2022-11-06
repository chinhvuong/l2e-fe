import { useCourse } from '@/api/hooks/useCourse'
import Button from '@/components/core/button'
import { Category } from '@/constants/interfaces'
import { CATEGORY, CATEGORY_NAME_LIST } from '@/constants/localStorage'
import Logo from '@/layout/main-layout/header/logo'
import Router from 'next/router'
import { useEffect, useState } from 'react'
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

    const { useCreateCourse } = useCourse()
    const { mutate: createCourse } = useCreateCourse({
        onError: () => {},
        onSuccess: (response) => {
            if (response?.data) {
                const category = response.data.map(
                    (item: Category) => item.name,
                )
                setCourseCategoryList(category)
                localStorage.setItem(CATEGORY, JSON.stringify(response))
                localStorage.setItem(
                    CATEGORY_NAME_LIST,
                    JSON.stringify(category),
                )
            }
        },
    })

    const { useGetCategory } = useCourse()
    const { data, isFetching } = useGetCategory()

    // useEffect(() => {
    //     if (data?.data) {
    //         const category = data.data.map((item: Category) => item.name)
    //         setCourseCategoryList(category)
    //     }
    // }, [isFetching])

    const convertToCategoryID = (categoryName: string) => {
        return (
            data?.data.find((item: Category) => item.name === categoryName)
                ?._id ?? ''
        )
    }

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
            return true
        }
        if (currentStep === 2 && courseName !== '') {
            return true
        }
        if (currentStep === 3 && courseCategory !== '') {
            return true
        }
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
            createCourse({
                name: courseName,
                category: convertToCategoryID(courseCategory),
            })
            Router.push('/create-course/landing-page')
        }
    }

    const getStepContent = () => {
        if (currentStep === 1) {
            return <CourseType />
        } else if (currentStep === 2) {
            return (
                <CourseTitle
                    setTitle={setCourseName}
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
