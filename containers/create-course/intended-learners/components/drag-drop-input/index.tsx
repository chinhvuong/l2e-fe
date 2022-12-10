import { RootState } from '@/store'
import { TInput } from '@/store/course/intended-learners/types'
import { TInputUpdate } from '@/store/course/types'
import {
    ActionCreatorWithoutPayload,
    ActionCreatorWithPayload,
} from '@reduxjs/toolkit'
import * as React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Container } from './container'

export interface IDragAndDropInputProps {
    name: string
    addItem: ActionCreatorWithoutPayload<string>
    updateItem: ActionCreatorWithPayload<TInputUpdate, string>
    updateItemToPayload: ActionCreatorWithPayload<string[], string>
    deleteItem: ActionCreatorWithPayload<number, string>
    getItems: (state: RootState) => TInput[]
    getUpdateState: (state: RootState) => boolean
    defaultInputBlock: number
}

export default function DragAndDropInput({
    name,
    addItem,
    updateItem,
    updateItemToPayload,
    deleteItem,
    getItems,
    getUpdateState,
    defaultInputBlock,
}: IDragAndDropInputProps) {
    return (
        <DndProvider backend={HTML5Backend}>
            <Container
                name={name}
                addItem={addItem}
                updateItem={updateItem}
                updateItemToPayload={updateItemToPayload}
                deleteItem={deleteItem}
                getItems={getItems}
                getUpdateState={getUpdateState}
                defaultInputBlock={defaultInputBlock}
            />
        </DndProvider>
    )
}
