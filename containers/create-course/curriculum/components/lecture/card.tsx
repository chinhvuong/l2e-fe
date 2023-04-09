import Input from '@/components/core/input'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { RootState } from '@/store'
import {
    CurriculumLecture,
    DeleteLecture,
} from '@/store/course/curriculum/types'
import { getQuizSelect } from '@/store/quiz/selectors'
import { QuizDetailType, QuizSelectType } from '@/store/quiz/types'
import '@/styles/animations.scss'
import { faBars, faChevronUp, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import type { Identifier, XYCoord } from 'dnd-core'
import { FC, useRef, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import Select, { ActionMeta } from 'react-select'
import { ItemTypes } from '../type'
import MainContent from './main-content'
import Resource from './resource'
import { getCurriculumLectureQuizzezDetail } from '@/store/course/curriculum/selectors'

export interface CardProps {
    id: string
    sectionId: string
    index: number
    moveCard: Function
    updateCard: ActionCreatorWithPayload<CurriculumLecture, string>
    deleteCard: ActionCreatorWithPayload<DeleteLecture, string>
    getCards: (state: RootState) => CurriculumLecture[][]
    getCardDetail: (
        id: string,
        sectionId: string,
    ) => (state: RootState) => CurriculumLecture
}

interface DragItem {
    index: number
    id: string
    type: string
}

export const Card: FC<CardProps> = ({
    id,
    sectionId,
    index,
    moveCard,
    updateCard,
    deleteCard,
    getCards,
    getCardDetail,
}) => {
    const ref = useRef<HTMLDivElement>(null)
    const dispatch = useAppDispatch()
    const curriculum =
        useAppSelector(getCards).find((item: CurriculumLecture[]) => {
            if (item[0].sectionId === sectionId) {
                return item
            }
        }) ?? []
    const lectureDetail = useAppSelector(getCardDetail(id, sectionId))
    const [expandLecture, setExpandLecture] = useState(true)
    const quizSelect = useAppSelector(getQuizSelect)
    const quizSelected = useAppSelector(
        getCurriculumLectureQuizzezDetail(id, sectionId),
    )
    const updateLectureTitle = (value: string) => {
        const newDetail = { ...lectureDetail }
        newDetail.name = value
        dispatch(updateCard(newDetail))
    }

    const updateLectureDescription = (value: string) => {
        const newDetail = { ...lectureDetail }
        newDetail.description = value
        dispatch(updateCard(newDetail))
    }

    const updateLectureQuizzes = (
        values: readonly QuizSelectType[],
        actionMeta: ActionMeta<QuizSelectType>,
    ) => {
        const newDetail = { ...lectureDetail }
        const newlist = [] as QuizDetailType[]
        values.forEach((item) => {
            newlist.push({
                _id: item.value,
                questions: [],
                courseId: '',
                name: item.label,
                createdAt: '',
                updatedAt: '',
            })
        })
        newDetail.quizzes = newlist
        dispatch(updateCard(newDetail))
    }

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
            dispatch(deleteCard({ sectionId: sectionId, index: id }))
        }
    }
    const [selectedOption, setSelectedOption] = useState(null)
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
                            name="Title"
                            defaultValue={lectureDetail.name}
                            updateInput={updateLectureTitle}
                        />
                    </div>
                </div>
                <div className="flex space-x-3 items-center">
                    {lectureDetail.name !== '' ? (
                        <>
                            <div className="flex items-center">
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
                            <div
                                ref={ref}
                                data-handler-id={handlerId}
                                className="flex items-center"
                            >
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
            <div className={`${!expandLecture && 'hidden'}`}>
                <div className="border-x border-b border-black">
                    <MainContent lectureDetail={lectureDetail} />
                </div>
                <div className="border-x border-b border-black">
                    <div className="flex items-center space-x-5 mx-10 py-5">
                        <div className="font-bold min-w-max">Description</div>
                        <div className="w-full bg-white rounded-[80px]">
                            <Input
                                charLimit={{ minLength: 10, maxLength: 80 }}
                                placeholder="Insert lecture description"
                                id={id}
                                name="Description"
                                defaultValue={lectureDetail.description}
                                updateInput={updateLectureDescription}
                            />
                        </div>
                    </div>
                </div>
                {quizSelect?.length > 0 && (
                    <div className="border-x border-b border-black">
                        <div className="flex items-center space-x-5 mx-10 py-5">
                            <div className="font-bold min-w-max">Quizzes</div>
                            <div className="w-full bg-white rounded-[80px]">
                                <Select
                                    options={quizSelect}
                                    defaultValue={quizSelected}
                                    isMulti
                                    onChange={updateLectureQuizzes}
                                />
                            </div>
                        </div>
                    </div>
                )}
                <div className="border-x border-b border-black">
                    <Resource />
                </div>
            </div>
        </div>
    )
}
