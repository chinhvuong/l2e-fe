import Button from '@/components/core/button'
import Logo from '@/layout/main-layout/header/logo'
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

    const nextStep = () => {
        if (currentStep !== step) {
            const next = currentStep + 1
            if (next <= step) {
                setCurrentStep(next)
                setStepBarWidth({
                    width: (next / step) * 100 + '%',
                })
            }
        } else {
            Router.push('/create-course/landing-page')
        }
    }

    const getStepContent = () => {
        if (currentStep === 1) {
            return <CourseType />
        } else if (currentStep === 2) {
            return <CourseTitle />
        } else if (currentStep === 3) {
            return <CourseCategory />
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
                    <Button className="text-white" onClick={() => nextStep()}>
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
