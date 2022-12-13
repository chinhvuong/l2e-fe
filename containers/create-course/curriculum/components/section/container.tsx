import AddMoreButton from '@/components/core/button/add-button'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { updateOrderCurriculumSection } from '@/store/course/curriculum'
import { CurriculumSection } from '@/store/course/curriculum/types'
import { useEffect, useState } from 'react'
import { useCallback } from 'react'
import { ISectionProps } from '.'
import { Card } from './card'

export const Container = ({
    addItem,
    updateItem,
    deleteItem,
    getItems,
    getItemDetail,
}: ISectionProps) => {
    const cardsFromStore = useAppSelector(getItems)
    const [cards, setCards] = useState(cardsFromStore)
    const dispatch = useAppDispatch()

    useEffect(() => {
        setCards(cardsFromStore)
    }, [cardsFromStore])

    const addCard = () => {
        if (cardsFromStore.every((item) => item.name !== '')) {
            dispatch(addItem())
        }
    }

    const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
        let newCards: CurriculumSection[] = []
        setCards((prevCards: CurriculumSection[]) => {
            newCards = [...prevCards]

            // dragCard is card we are dragging
            const dragCard = newCards[dragIndex]

            // removing this dragCard from array
            newCards.splice(dragIndex, 1)

            // insert dragCard at hover position
            newCards.splice(hoverIndex, 0, dragCard)
            return newCards
        })
        dispatch(updateOrderCurriculumSection(newCards))
    }, [])

    const renderCard = useCallback((card, index: number) => {
        return (
            <Card
                key={card._id}
                index={index}
                id={card._id}
                moveCard={moveCard}
                updateCard={updateItem}
                deleteCard={deleteItem}
                getCards={getItems}
                getCardDetail={getItemDetail}
            />
        )
    }, [])

    return (
        <>
            <div className="space-y-4">
                {cards.map((card, i) => renderCard(card, i))}
                <AddMoreButton onClick={() => addCard()} label="Add section" />
            </div>
        </>
    )
}
