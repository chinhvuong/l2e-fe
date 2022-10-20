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
    addItem: ActionCreatorWithoutPayload<string>
    updateItem: ActionCreatorWithPayload<TInputUpdate, string>
    updateOrderItems: ActionCreatorWithPayload<string[], string>
    deleteItem: ActionCreatorWithPayload<number, string>
    getItems: (state: RootState) => TInput[]
    defaultInputBlock: number
}

export default function DragAndDropInput({
    addItem,
    updateItem,
    updateOrderItems,
    deleteItem,
    getItems,
    defaultInputBlock,
}: IDragAndDropInputProps) {
    return (
        <DndProvider backend={HTML5Backend}>
            <Container
                addItem={addItem}
                updateItem={updateItem}
                updateOrderItems={updateOrderItems}
                deleteItem={deleteItem}
                getItems={getItems}
                defaultInputBlock={defaultInputBlock}
            />
        </DndProvider>
    )
}
