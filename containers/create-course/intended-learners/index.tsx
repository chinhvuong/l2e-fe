import Hyperlink from '@/containers/create-course/components/hyperlink'
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
                <DragAndDrop />
            </div>
        </div>
    )
}
