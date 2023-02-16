import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Router from 'next/router'
import Button from '@/components/core/button'
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
import { CurriculumSection } from '@/store/course/curriculum/types'
import { COURSE_ID } from '@/constants/localStorage'
import { InstructorAPI } from '@/api/api-path'
import {
    getCurriculumLecturesForm,
    getCurriculumSectionsForm,
} from '@/store/course/curriculum/selectors'
import useAPI from '@/api/hooks/useAPI'
import { noop } from 'lodash'
import useLoadingScreen from '@/hooks/useLoadingScreen'
import { useCreateCourseContext } from '@/containers/create-course/create-course-context'

export interface IHeaderProps {}

export default function Header() {
    const {
        courseDetail,
        courseSections,
        updateCourse,
        upsertSections,
        isLoading,
    } = useCreateCourseContext()

    const goBack = () => {
        Router.push('/instructor')
    }

    const handleUpdateCourseDetail = () => {
        updateCourse(courseDetail)
        upsertSections(
            courseSections.map((item) => {
                const el: any = { ...item }
                delete el._id
                return el
            }),
        )
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
