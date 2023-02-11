import {
    addCurriculumSection,
    deleteCurriculumSection,
    updateCurriculumSectionName,
    updateOrderCurriculumSection,
} from '@/store/course/curriculum'
import {
    getCurriculumSectionDetail,
    getCurriculumSectionsForm,
    getInputContentCurriculumSection,
} from '@/store/course/curriculum/selectors'
import { useState, useEffect } from 'react'
import Title from '../components/title'
import Section from './components/section'
import Loading from '@/components/core/animate/loading'
import { useAppSelector } from '@/hooks'
import {
    getMyCourseDetail,
    getCourseDetailState,
} from '@/store/course/selectors'
import { useDispatch } from 'react-redux'
import { updateLoadingState } from '@/store/course'
import useLoadingScreen from '@/hooks/useLoadingScreen'

export interface ICurriculumContainerProps {}

export default function CurriculumContainer() {
    const courseDetail = useAppSelector(getCurriculumSectionsForm)
    const isNewCourseDetail = useAppSelector(getCourseDetailState)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (isNewCourseDetail) {
        }
        if (courseDetail.length > 0) {
            setIsLoading(false)
        }
    }, [isNewCourseDetail, courseDetail])

    useLoadingScreen(isLoading)

    return (
        <div>
            <Title title={'Curriculum'} />
            {!isLoading && (
                <div className="py-10 px-14 space-y-5">
                    <Section
                        addItem={addCurriculumSection}
                        updateItem={updateCurriculumSectionName}
                        deleteItem={deleteCurriculumSection}
                        getItems={getCurriculumSectionsForm}
                        getItemDetail={getCurriculumSectionDetail}
                    ></Section>
                </div>
            )}
        </div>
    )
}
