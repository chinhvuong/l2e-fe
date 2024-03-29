import Input from '@/components/core/input'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { RootState } from '@/store'
import {
    addCurriculumLecture,
    deleteCurriculumLecture,
    updateCurriculumLecture,
} from '@/store/course/curriculum'
import {
    getCurriculumLectureDetail,
    getCurriculumLecturesForm,
} from '@/store/course/curriculum/selectors'
import { CurriculumSection } from '@/store/course/curriculum/types'
import { TInputUpdate } from '@/store/course/types'
import { faBars, faChevronUp, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import type { Identifier, XYCoord } from 'dnd-core'
import { FC, useRef, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import Lecture from '../lecture'
import { ItemTypes } from '../type'

export interface CardProps {
    id: string
    index: number
    moveCard: Function
    updateCard: ActionCreatorWithPayload<TInputUpdate, string>
    deleteCard: ActionCreatorWithPayload<string, string>
    getCards: (state: RootState) => CurriculumSection[]
    getCardDetail: (id: string) => (state: RootState) => CurriculumSection
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
    getCardDetail,
}) => {
    const ref = useRef<HTMLDivElement>(null)
    const dispatch = useAppDispatch()
    const curriculum = useAppSelector(getCards)
    const sectionDetail = useAppSelector(getCardDetail(id))
    const [expandSection, setExpandSection] = useState(true)

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

    const handleDeleteCard = (id: string) => {
        if (curriculum.length > 1) {
            dispatch(deleteCard(id))
        }
    }

    return (
        <div
            className="border border-black bg-course-section py-5 px-3"
            style={{ opacity }}
        >
            <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-5 w-full">
                    <div className="font-bold min-w-max">{`Section ${
                        index + 1
                    }:`}</div>
                    <div className="w-full bg-white rounded-[80px]">
                        <Input
                            charLimit={{ minLength: 10, maxLength: 80 }}
                            placeholder="Insert section title"
                            id={id}
                            defaultValue={sectionDetail.name}
                            updateToStore={updateCard}
                        />
                    </div>
                </div>
                <div className="flex space-x-3 items-center">
                    {sectionDetail.name !== '' || index !== 0 ? (
                        <>
                            <div>
                                <FontAwesomeIcon
                                    icon={faTrash}
                                    className={`text-xl bg-red-500 text-white rounded-full py-[10px] px-[11px] ${
                                        curriculum.length > 1
                                            ? 'cursor-pointer'
                                            : 'cursor-not-allowed'
                                    }`}
                                    onClick={() => handleDeleteCard(id)}
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
                        <div className="flex space-x-3 items-center">
                            <div className="flex items-center">
                                <FontAwesomeIcon
                                    icon={faTrash}
                                    className="text-xl text-transparent rounded-full py-[10px] px-[11px]"
                                />
                            </div>
                            <div className="flex items-center">
                                <FontAwesomeIcon
                                    icon={faBars}
                                    className="text-xl text-transparent rounded-full py-[10px] px-[11px]"
                                />
                            </div>
                        </div>
                    )}
                    <FontAwesomeIcon
                        icon={faChevronUp}
                        className={`mt-1 px-3 arrow-animation ease-in cursor-pointer ${
                            expandSection ? 'rotate-0' : 'rotate-180'
                        }`}
                        onClick={() => setExpandSection(!expandSection)}
                    />
                </div>
            </div>
            <div className={`mt-5 ml-10 ${!expandSection && 'hidden'}`}>
                <Lecture
                    sectionId={sectionDetail._id}
                    addItem={addCurriculumLecture}
                    updateItem={updateCurriculumLecture}
                    deleteItem={deleteCurriculumLecture}
                    getItems={getCurriculumLecturesForm}
                    getCardDetail={getCurriculumLectureDetail}
                ></Lecture>
            </div>
        </div>
    )
}
