import Input from '@/components/core/input'
import type { Identifier, XYCoord } from 'dnd-core'
import type { FC } from 'react'
import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { ItemTypes } from './types'
import { faBars, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import { TInput } from '@/store/course/intended-learners/types'
import { TInputUpdate } from '@/store/course/types'
import { RootState } from '@/store'

export interface CardProps {
    id: string
    name: string
    defaultValue: string
    index: number
    placeholder: string
    moveCard: Function
    updateCard: ActionCreatorWithPayload<TInputUpdate, string>
    deleteCard: ActionCreatorWithPayload<number, string>
    getCards: (state: RootState) => TInput[]
    defaultInputBlock: number
}

interface DragItem {
    index: number
    id: string
    type: string
}

export const Card: FC<CardProps> = ({
    id,
    name,
    defaultValue,
    index,
    placeholder,
    moveCard,
    updateCard,
    deleteCard,
    getCards,
    defaultInputBlock,
}) => {
    const ref = useRef<HTMLDivElement>(null)
    const dispatch = useAppDispatch()
    const whatYouWillLearn = useAppSelector(getCards)

    const [{ handlerId }, drop] = useDrop<
        DragItem,
        void,
        { handlerId: Identifier | null }
    >({
        accept: ItemTypes.CARD,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item: DragItem, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index

            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return
            }

            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect()

            // Get vertical middle
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

            // Determine mouse position
            const clientOffset = monitor.getClientOffset()

            // Get pixels to the top
            const hoverClientY =
                (clientOffset as XYCoord).y - hoverBoundingRect.top

            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%

            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }

            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }

            // Time to actually perform the action
            moveCard(dragIndex, hoverIndex)

            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex
        },
    })

    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.CARD,
        item: () => {
            return { id, index }
        },
        collect: (monitor: any) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    const opacity = isDragging ? 0 : 1
    drag(drop(ref))

    const handleDeleteCard = (id: number) => {
        if (whatYouWillLearn.length > defaultInputBlock) {
            dispatch(deleteCard(id))
        }
    }

    return (
        <div className="flex items-center space-x-3" style={{ opacity }}>
            <div className="basis-3/4">
                <Input
                    charLimit={{ minLength: 10, maxLength: 160 }}
                    placeholder={placeholder}
                    id={id}
                    name={name}
                    updateToStore={updateCard}
                    defaultValue={defaultValue}
                />
            </div>
            {whatYouWillLearn[index].content !== '' ? (
                <div className="flex space-x-3 items-center">
                    <div>
                        <FontAwesomeIcon
                            icon={faTrash}
                            className={`text-lg bg-red-500 text-white rounded-full py-[10px] px-[11px] ${
                                whatYouWillLearn.length > defaultInputBlock
                                    ? 'cursor-pointer'
                                    : 'cursor-not-allowed'
                            }`}
                            onClick={() => handleDeleteCard(index)}
                        />
                    </div>
                    <div ref={ref} data-handler-id={handlerId}>
                        <FontAwesomeIcon
                            icon={faBars}
                            className="text-lg bg-black text-white rounded-full py-[10px] px-[11px] cursor-move"
                        />
                    </div>
                </div>
            ) : (
                <div className="flex space-x-3 items-center">
                    <div>
                        <FontAwesomeIcon
                            icon={faTrash}
                            className="text-xl text-transparent rounded-full py-[10px] px-[11px]"
                        />
                    </div>
                    <div>
                        <FontAwesomeIcon
                            icon={faBars}
                            className="text-xl text-transparent rounded-full py-[10px] px-[11px]"
                        />
                    </div>
                </div>
            )}
        </div>
    )
}
