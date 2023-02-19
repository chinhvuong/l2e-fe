import {
    addCurriculumSection,
    deleteCurriculumSection,
    updateCurriculumSectionName,
} from '@/store/course/curriculum'
import {
    getCurriculumSectionDetail,
    getCurriculumSectionsForm,
} from '@/store/course/curriculum/selectors'
import { useState, useEffect } from 'react'
import Title from '../components/title'
import Section from './components/section'
import { useAppSelector } from '@/hooks'
import { getCourseDetailState } from '@/store/course/selectors'
import LoadingScreen from '@/components/core/animate/loading-screen'

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

    return (
        <div>
            <LoadingScreen isLoading={isLoading} />
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
