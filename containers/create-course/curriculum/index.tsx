import LoadingScreen from '@/components/core/animate/loading-screen'
import { useAppSelector } from '@/hooks'
import useHideFirstEnterLoadingScreen from '@/hooks/useHideFirstEnterLoadingScreen'
import {
    addCurriculumSection,
    deleteCurriculumSection,
    updateCurriculumSectionName,
} from '@/store/course/curriculum'
import {
    getCurriculumLecturesForm,
    getCurriculumSectionDetail,
    getCurriculumSectionsForm,
} from '@/store/course/curriculum/selectors'
import { useEffect, useState } from 'react'
import Title from '../components/title'
import Section from './components/section'

export interface ICurriculumContainerProps {}

export default function CurriculumContainer() {
    const courseSections = useAppSelector(getCurriculumSectionsForm)
    const courseLectures = useAppSelector(getCurriculumLecturesForm)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (courseSections.length > 0 && courseLectures.length > 0) {
            setIsLoading(false)
        }
    }, [courseSections, courseLectures])

    useHideFirstEnterLoadingScreen()

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
