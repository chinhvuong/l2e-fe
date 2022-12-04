import Hyperlink from '@/containers/create-course/components/hyperlink'
import {
    addRequirements,
    addWhatYouWillLearn,
    deleteRequirements,
    deleteWhatYouWillLearn,
    updateOrderRequirements,
    updateOrderWhatYouWillLearn,
    updateRequirements,
    updateWhatYouWillLearn,
} from '@/store/course/intended-learners'
import {
    getRequirementsForm,
    getRequirementsState,
    getWhatYouWillLearnForm,
    getWhatYouWillLearnState,
} from '@/store/course/intended-learners/selectors'

import { useState, useEffect } from 'react'
import DragAndDropInput from './components/drag-drop-input'
import Subtitle from '../components/subtitle'
import Title from '../components/title'
import { useAppSelector } from '@/hooks'
import { getCourseDetail, getCourseDetailState } from '@/store/course/selectors'
import Loading from '@/components/core/animate/loading'
import { updateCourseGoals, updateCourseRequirements } from '@/store/course'

export interface IIntendedLearnersContainerProps {}

export default function IntendedLearnersContainer() {
    const courseId = useAppSelector(getCourseDetail)._id
    const isNewCourseDetail = useAppSelector(getCourseDetailState)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (isNewCourseDetail) {
        }
        if (courseId !== '') {
            setIsLoading(false)
        }
    }, [isNewCourseDetail])

    return (
        <div>
            <Title title={'Intended learners'} />
            {isLoading ? (
                <div className="flex justify-center items-center h-40">
                    <Loading />
                </div>
            ) : (
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
                            <Hyperlink>
                                learning objectives or outcomes
                            </Hyperlink>
                            <span>{` that learners can expect to achieve after completing your course.`}</span>
                        </div>
                    </div>
                    <DragAndDropInput
                        name="What you will learn"
                        addItem={addWhatYouWillLearn}
                        updateItem={updateWhatYouWillLearn}
                        updateItemToPayload={updateCourseGoals}
                        updateOrderItems={updateOrderWhatYouWillLearn}
                        deleteItem={deleteWhatYouWillLearn}
                        getItems={getWhatYouWillLearnForm}
                        getUpdateState={getWhatYouWillLearnState}
                        defaultInputBlock={4}
                    />
                    <div className="space-y-2">
                        <Subtitle title="What are the requirements or prerequisites for taking your course?"></Subtitle>
                        <div>
                            {`List the required skills, experience, tools or equipment learners should have prior to taking your course. If there are no requirements, use this space as an opportunity to lower the barrier for beginners.`}
                        </div>
                    </div>
                    <DragAndDropInput
                        name="Requirements"
                        addItem={addRequirements}
                        updateItem={updateRequirements}
                        updateItemToPayload={updateCourseRequirements}
                        updateOrderItems={updateOrderRequirements}
                        deleteItem={deleteRequirements}
                        getItems={getRequirementsForm}
                        getUpdateState={getRequirementsState}
                        defaultInputBlock={1}
                    />
                    {/* <div className="space-y-2">
                        <Subtitle title="Who is this course for?"></Subtitle>
                        <div>
                            <span>{`Write a clear description of the `}</span>
                            <Hyperlink>intended learners</Hyperlink>
                            <span>{` for your course who will find your course content valuable. This will help you attract the right learners to your course.`}</span>
                        </div>
                    </div>
                    <DragAndDropInput
                        name="Intended learners"
                        addItem={addIntendedLearners}
                        updateItem={updateIntendedLearners}
                        updateOrderItems={updateOrderIntendedLearners}
                        deleteItem={deleteIntendedLearners}
                        getItems={getIntendedLearnersForm}
                        getUpdateState={getIntendedLearnersState}
                        defaultInputBlock={1}
                    /> */}
                </div>
            )}
        </div>
    )
}
