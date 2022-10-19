import { TInput, TInputUpdate } from '@/store/course/types'
import {
    ActionCreatorWithoutPayload,
    ActionCreatorWithPayload,
} from '@reduxjs/toolkit'
import * as React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Container } from './container'

export interface IDragAndDropProps {
    addItem: ActionCreatorWithoutPayload<string>
    updateItem: ActionCreatorWithPayload<TInputUpdate, string>
    updateOrderItems: ActionCreatorWithPayload<string[], string>
    deleteItem: ActionCreatorWithPayload<number, string>
    getItems: () => TInput[]
    defaultInputBlock: number
}

export default function DragAndDrop({
    addItem,
    updateItem,
    updateOrderItems,
    deleteItem,
    getItems,
    defaultInputBlock,
}: IDragAndDropProps) {
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
