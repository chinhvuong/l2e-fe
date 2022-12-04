import {
    addCurriculumSection,
    deleteCurriculumSection,
    updateCurriculumSectionName,
    updateOrderCurriculumSection,
} from '@/store/course/curriculum'
import {
    getCurriculumSectionsForm,
    getInputContentCurriculumSection,
} from '@/store/course/curriculum/selectors'
import { useState, useEffect } from 'react'
import Title from '../components/title'
import Section from './components/section'
import Loading from '@/components/core/animate/loading'
import { useAppSelector } from '@/hooks'
import { getCourseDetail, getCourseDetailState } from '@/store/course/selectors'

export interface ICurriculumContainerProps {}

export default function CurriculumContainer() {
    const courseDetail = useAppSelector(getCourseDetail)
    const isNewCourseDetail = useAppSelector(getCourseDetailState)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (isNewCourseDetail) {
        }
        if (courseDetail._id !== '') {
            setIsLoading(false)
        }
    }, [isNewCourseDetail])
    return (
        <div>
            <Title title={'Curriculum'} />
            {isLoading ? (
                <div className="flex justify-center items-center h-40">
                    <Loading />
                </div>
            ) : (
                <div className="py-10 px-14 space-y-5">
                    <Section
                        addItem={addCurriculumSection}
                        updateItem={updateCurriculumSectionName}
                        updateOrderItems={updateOrderCurriculumSection}
                        deleteItem={deleteCurriculumSection}
                        getItems={getCurriculumSectionsForm}
                        getItemName={getInputContentCurriculumSection}
                    ></Section>
                </div>
            )}
        </div>
    )
}
