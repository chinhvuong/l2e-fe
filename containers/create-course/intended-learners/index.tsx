import Hyperlink from '@/containers/create-course/components/hyperlink'
import {
    addIntendedLearners,
    addRequirements,
    addWhatYouWillLearn,
    deleteIntendedLearners,
    deleteRequirements,
    deleteWhatYouWillLearn,
    updateIntendedLearners,
    updateOrderIntendedLearners,
    updateOrderRequirements,
    updateOrderWhatYouWillLearn,
    updateRequirements,
    updateWhatYouWillLearn,
} from '@/store/course'
import {
    getIntendedLearnersForm,
    getRequirementsForm,
    getWhatYouWillLearnForm,
} from '@/store/course/selectors'
import * as React from 'react'
import DragAndDrop from '../components/drag-drop/intended-learners'
import Subtitle from '../components/subtitle'
import Title from '../components/title'

export interface IIntendedLearnersContainerProps {}

export default function IntendedLearnersContainer() {
    return (
        <div>
            <Title title={'Intended learners'} />
            <div className="py-10 px-14 space-y-5">
                <div>
                    <span>{`The following descriptions will be publicly visible on your `}</span>
                    <Hyperlink>Landing Page</Hyperlink>
                    <span>{` and will have a direct
                    impact on your course performance. These descriptions will
                    help learners decide if your course is right for them.`}</span>
                </div>
                <div className="space-y-2">
                    <Subtitle title="What will students learn in your course?"></Subtitle>
                    <div>
                        <span>{`You must enter at least 4 `}</span>
                        <Hyperlink>learning objectives or outcomes</Hyperlink>
                        <span>{` that learners can expect to achieve after completing your course.`}</span>
                    </div>
                </div>
                <DragAndDrop
                    addItem={addWhatYouWillLearn}
                    updateItem={updateWhatYouWillLearn}
                    updateOrderItems={updateOrderWhatYouWillLearn}
                    deleteItem={deleteWhatYouWillLearn}
                    getItems={getWhatYouWillLearnForm}
                    defaultInputBlock={4}
                />
                <div className="space-y-2">
                    <Subtitle title="What are the requirements or prerequisites for taking your course?"></Subtitle>
                    <div>
                        {`List the required skills, experience, tools or equipment learners should have prior to taking your course. If there are no requirements, use this space as an opportunity to lower the barrier for beginners.`}
                    </div>
                </div>
                <DragAndDrop
                    addItem={addRequirements}
                    updateItem={updateRequirements}
                    updateOrderItems={updateOrderRequirements}
                    deleteItem={deleteRequirements}
                    getItems={getRequirementsForm}
                    defaultInputBlock={1}
                />
                <div className="space-y-2">
                    <Subtitle title="Who is this course for?"></Subtitle>
                    <div>
                        <span>{`Write a clear description of the `}</span>
                        <Hyperlink>intended learners</Hyperlink>
                        <span>{` for your course who will find your course content valuable. This will help you attract the right learners to your course.`}</span>
                    </div>
                </div>
                <DragAndDrop
                    addItem={addIntendedLearners}
                    updateItem={updateIntendedLearners}
                    updateOrderItems={updateOrderIntendedLearners}
                    deleteItem={deleteIntendedLearners}
                    getItems={getIntendedLearnersForm}
                    defaultInputBlock={1}
                />
            </div>
        </div>
    )
}
