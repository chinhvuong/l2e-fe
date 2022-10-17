import Input from '@/components/core/input'
import type { Identifier, XYCoord } from 'dnd-core'
import type { FC } from 'react'
import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { ItemTypes } from './types'
import { faBars, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export interface CardProps {
    id: any
    index: number
    placeholder: string
    moveCard: Function
    updateCard: Function
    deleteCard: Function
}

interface DragItem {
    index: number
    id: string
    type: string
}

export const Card: FC<CardProps> = ({
    id,
    index,
    placeholder,
    moveCard,
    updateCard,
    deleteCard,
}) => {
    const ref = useRef<HTMLDivElement>(null)
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

    return (
        <div className="flex items-center space-x-2" style={{ opacity }}>
            <div className="basis-3/4">
                <Input
                    charLimit={{ minLength: 10, maxLength: 160 }}
                    placeholder={placeholder}
                    index={index}
                    setInput={updateCard}
                />
            </div>
            <div>
                <FontAwesomeIcon
                    icon={faTrash}
                    className="text-xl bg-red-500 text-white rounded-full py-[12px] px-[13px]"
                    onClick={() => deleteCard(index)}
                />
            </div>
            <div ref={ref} data-handler-id={handlerId}>
                <FontAwesomeIcon
                    icon={faBars}
                    className="text-xl bg-black text-white rounded-full py-[12px] px-[13px]"
                />
            </div>
        </div>
    )
}
