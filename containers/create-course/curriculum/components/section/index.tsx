import { RootState } from '@/store'
import { CurriculumSection } from '@/store/course/curriculum/types'
import { TInputUpdate } from '@/store/course/types'
import {
    ActionCreatorWithoutPayload,
    ActionCreatorWithPayload,
} from '@reduxjs/toolkit'
import * as React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Container } from './container'

export interface ISectionProps {
    addItem: ActionCreatorWithoutPayload<string>
    updateItem: ActionCreatorWithPayload<TInputUpdate, string>
    deleteItem: ActionCreatorWithPayload<string, string>
    getItems: (state: RootState) => CurriculumSection[]
    getItemDetail: (id: string) => (state: RootState) => CurriculumSection
}

export default function Section({
    addItem,
    updateItem,
    deleteItem,
    getItems,
    getItemDetail,
}: ISectionProps) {
    return (
        <DndProvider backend={HTML5Backend}>
            <Container
                addItem={addItem}
                updateItem={updateItem}
                deleteItem={deleteItem}
                getItems={getItems}
                getItemDetail={getItemDetail}
            />
        </DndProvider>
    )
}
