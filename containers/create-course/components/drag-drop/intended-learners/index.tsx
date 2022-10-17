import * as React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Container } from './container'

export interface IDragAndDropProps {}

export default function DragAndDrop() {
    return (
        <DndProvider backend={HTML5Backend}>
            <Container />
        </DndProvider>
    )
}
