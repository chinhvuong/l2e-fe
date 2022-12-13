import AddMoreButton from '@/components/core/button/add-button'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { updateAllCurriculumLectures } from '@/store/course/curriculum'
import { CurriculumLecture } from '@/store/course/curriculum/types'
import { useEffect, useState } from 'react'
import { useCallback } from 'react'
import { ILectureProps } from '.'
import { Card } from './card'

export const Container = ({
    sectionId,
    addItem,
    updateItem,
    deleteItem,
    getItems,
    getCardDetail,
}: ILectureProps) => {
    const cardsFromStore = useAppSelector(getItems)
    const [cards, setCards] = useState<CurriculumLecture[]>([])
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (cardsFromStore.length !== 0 && cardsFromStore[0].length !== 0) {
            const cardsPlacedInStore = cardsFromStore.find((item) => {
                if (item[0].sectionId === sectionId) {
                    return item
                }
            })
            if (
                cardsPlacedInStore !== undefined &&
                !arraysEqual(cards, cardsPlacedInStore)
            ) {
                setCards(cardsPlacedInStore)
            }
        }
    }, [cardsFromStore])

    const arraysEqual = (
        arr1: CurriculumLecture[],
        arr2: CurriculumLecture[],
    ) =>
        arr1.length === arr2.length &&
        arr1.every((item, index) => {
            Object.values(item).toString() ===
                Object.values(arr2[index]).toString()
        })

    const addCard = () => {
        if (cards.every((item: CurriculumLecture) => item.name !== '')) {
            dispatch(addItem(sectionId))
        }
    }

    const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
        let newCards: CurriculumLecture[] = []
        setCards((prevCards: CurriculumLecture[]) => {
            newCards = [...prevCards]

            // dragCard is card we are dragging
            const dragCard = newCards[dragIndex]

            // removing this dragCard from array
            newCards.splice(dragIndex, 1)

            // insert dragCard at hover position
            newCards.splice(hoverIndex, 0, dragCard)
            return newCards
        })
        dispatch(updateAllCurriculumLectures(newCards))
    }, [])

    const renderCard = useCallback((card, index: number) => {
        return (
            <Card
                key={card._id}
                index={index}
                id={card._id}
                sectionId={sectionId}
                moveCard={moveCard}
                updateCard={updateItem}
                deleteCard={deleteItem}
                getCards={getItems}
                getCardDetail={getCardDetail}
            />
        )
    }, [])

    return (
        <>
            <div className="space-y-4">
                {cards.map((card, i) => renderCard(card, i))}
                <AddMoreButton onClick={() => addCard()} label="Add lecture" />
            </div>
        </>
    )
}
