import { RootState } from '@/store'
import {
    CurriculumLecture,
    DeleteLecture,
} from '@/store/course/curriculum/types'
import { TInputUpdate } from '@/store/course/types'
import {
    ActionCreatorWithoutPayload,
    ActionCreatorWithPayload,
} from '@reduxjs/toolkit'
import * as React from 'react'
import { Container } from './container'

export interface ILectureProps {
    sectionId: string
    addItem: ActionCreatorWithPayload<string, string>
    updateItem: ActionCreatorWithPayload<CurriculumLecture, string>
    deleteItem: ActionCreatorWithPayload<DeleteLecture, string>
    getItems: (state: RootState) => CurriculumLecture[][]
    getCardDetail: (
        id: string,
        sectionId: string,
    ) => (state: RootState) => CurriculumLecture
}

export default function Lecture({
    sectionId,
    addItem,
    updateItem,
    deleteItem,
    getItems,
    getCardDetail,
}: ILectureProps) {
    return (
        // <DndProvider backend={HTML5Backend}>
        <Container
            sectionId={sectionId}
            addItem={addItem}
            updateItem={updateItem}
            deleteItem={deleteItem}
            getItems={getItems}
            getCardDetail={getCardDetail}
        />
        // </DndProvider>
    )
}
