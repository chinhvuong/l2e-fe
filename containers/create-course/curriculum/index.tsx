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
import * as React from 'react'
import Title from '../components/title'
import Section from './components/section'

export interface ICurriculumContainerProps {}

export default function CurriculumContainer() {
    return (
        <div>
            <Title title={'Curriculum'} />
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
        </div>
    )
}
