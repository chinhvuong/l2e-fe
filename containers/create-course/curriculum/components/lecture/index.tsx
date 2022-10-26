import { RootState } from '@/store'
import { CurriculumLecture } from '@/store/course/curriculum/types'
import { TInputUpdate } from '@/store/course/types'
import {
    ActionCreatorWithoutPayload,
    ActionCreatorWithPayload,
} from '@reduxjs/toolkit'
import * as React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Container } from './container'

export interface ILectureProps {
    addItem: ActionCreatorWithoutPayload<string>
    updateItem: ActionCreatorWithPayload<TInputUpdate, string>
    updateOrderItems: ActionCreatorWithPayload<string[], string>
    deleteItem: ActionCreatorWithPayload<number, string>
    getItems: (state: RootState) => CurriculumLecture[]
    getItemName: (id: string) => (state: RootState) => string
}

export default function Lecture({
    addItem,
    updateItem,
    updateOrderItems,
    deleteItem,
    getItems,
    getItemName,
}: ILectureProps) {
    return (
        // <DndProvider backend={HTML5Backend}>
        <Container
            addItem={addItem}
            updateItem={updateItem}
            updateOrderItems={updateOrderItems}
            deleteItem={deleteItem}
            getItems={getItems}
            getItemName={getItemName}
        />
        // </DndProvider>
    )
}
