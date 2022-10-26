import Input from '@/components/core/input'
import type { Identifier, XYCoord } from 'dnd-core'
import { FC, useState } from 'react'
import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { ItemTypes } from '../type'
import { faBars, faChevronUp, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import { CurriculumLecture } from '@/store/course/curriculum/types'
import { RootState } from '@/store'
import { TInputUpdate } from '@/store/course/types'
import '@/styles/animations.scss'

export interface CardProps {
    id: string
    index: number
    moveCard: Function
    updateCard: ActionCreatorWithPayload<TInputUpdate, string>
    deleteCard: ActionCreatorWithPayload<number, string>
    getCards: (state: RootState) => CurriculumLecture[]
    getCardName: (id: string) => (state: RootState) => string
}

interface DragItem {
    index: number
    id: string
    type: string
}

export const Card: FC<CardProps> = ({
    id,
    index,
    moveCard,
    updateCard,
    deleteCard,
    getCards,
    getCardName,
}) => {
    const ref = useRef<HTMLDivElement>(null)
    const dispatch = useAppDispatch()
    const curriculum = useAppSelector(getCards)
    const lectureName = useAppSelector(getCardName(id))
    const [expandLecture, setExpandLecture] = useState(false)

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
        if (curriculum.length > 1) {
            dispatch(deleteCard(id))
        }
    }

    return (
        <div className="bg-white">
            <div
                className="flex items-center space-x-2 border border-black py-5 px-3"
                style={{ opacity }}
            >
                <div className="flex items-center space-x-5 w-full">
                    <div className="font-bold min-w-max">{`Lecture ${
                        index + 1
                    }:`}</div>
                    <div className="w-full bg-white rounded-[80px]">
                        <Input
                            charLimit={{ minLength: 10, maxLength: 80 }}
                            placeholder="Insert lecture title"
                            id={id}
                            updateToStore={updateCard}
                        />
                    </div>
                </div>
                <div className="flex space-x-3 items-center">
                    {lectureName !== '' ? (
                        <>
                            <div>
                                <FontAwesomeIcon
                                    icon={faTrash}
                                    className={`text-xl bg-red-500 text-white rounded-full py-[10px] px-[11px] ${
                                        curriculum.length > 1
                                            ? 'cursor-pointer'
                                            : 'cursor-not-allowed'
                                    }`}
                                    onClick={() => handleDeleteCard(index)}
                                />
                            </div>
                            <div ref={ref} data-handler-id={handlerId}>
                                <FontAwesomeIcon
                                    icon={faBars}
                                    className="text-xl bg-black text-white rounded-full py-[10px] px-[11px] cursor-move"
                                />
                            </div>
                        </>
                    ) : (
                        <>
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
                        </>
                    )}
                    <FontAwesomeIcon
                        icon={faChevronUp}
                        className={`mt-1 px-3 arrow-animation ease-in cursor-pointer ${
                            expandLecture ? 'rotate-0' : 'rotate-180'
                        }`}
                        onClick={() => setExpandLecture(!expandLecture)}
                    />
                </div>
            </div>
            <div
                className={`h-[500px] border-x border-b border-black ${
                    !expandLecture && 'hidden'
                }`}
            ></div>
        </div>
    )
}
