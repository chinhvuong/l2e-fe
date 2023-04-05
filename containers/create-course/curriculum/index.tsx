import LoadingScreen from '@/components/core/animate/loading-screen'
import useHideFirstEnterLoadingScreen from '@/hooks/useHideFirstEnterLoadingScreen'
import {
    addCurriculumSection,
    deleteCurriculumSection,
    updateCurriculumSectionName,
} from '@/store/course/curriculum'
import {
    getCurriculumSectionDetail,
    getCurriculumSectionsForm,
} from '@/store/course/curriculum/selectors'
import Title from '../components/title'
import { useCreateCourseContext } from '../create-course-context'
import Section from './components/section'

export interface ICurriculumContainerProps {}

export default function CurriculumContainer() {
    const { isLoading, courseSections, courseLectures } =
        useCreateCourseContext()
    useHideFirstEnterLoadingScreen()
    console.log(courseLectures.length)
    return (
        <div>
            <LoadingScreen
                isLoading={
                    isLoading ||
                    courseSections.length === 0 ||
                    courseLectures.length === 0
                }
            />
            <Title title={'Curriculum'} />
            {courseSections.length > 0 && courseLectures.length > 0 && (
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
