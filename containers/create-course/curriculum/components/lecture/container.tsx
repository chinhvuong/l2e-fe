import AddMoreButton from '@/components/core/button/add-button'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { CurriculumLecture } from '@/store/course/curriculum/types'
import { useEffect, useState } from 'react'
import { useCallback } from 'react'
import { ILectureProps } from '.'
import { Card } from './card'

export const Container = ({
    addItem,
    updateItem,
    updateOrderItems,
    deleteItem,
    getItems,
    getItemName,
}: ILectureProps) => {
    const cardsFromStore = useAppSelector(getItems)
    const [cards, setCards] = useState(cardsFromStore)
    const [cardsOrder, setCardsOrder] = useState(cards.map((item) => item._id))
    const dispatch = useAppDispatch()

    useEffect(() => {
        setCards(cardsFromStore)
    }, [cardsFromStore])

    useEffect(() => {
        isChangeCardsOrder()
    }, [cards])

    useEffect(() => {
        dispatch(updateOrderItems(cardsOrder))
    }, [cardsOrder])

    const addCard = () => {
        if (cardsFromStore.every((item) => item.name !== '')) {
            dispatch(addItem())
        }
    }

    const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
        setCards((prevCards: CurriculumLecture[]) => {
            const newCards = [...prevCards]

            // dragCard is card we are dragging
            const dragCard = newCards[dragIndex]

            // removing this dragCard from array
            newCards.splice(dragIndex, 1)

            // insert dragCard at hover position
            newCards.splice(hoverIndex, 0, dragCard)
            return newCards
        })
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
                getCardName={getItemName}
            />
        )
    }, [])

    const isChangeCardsOrder = () => {
        const newOrder = [...cardsOrder]
        let isChange = false
        for (let i = 0; i < cards.length; i++) {
            if (cards[i]._id !== cardsFromStore[i]._id) {
                newOrder[i] = cards[i]._id
                isChange = true
            }
        }
        if (isChange) {
            setCardsOrder(newOrder)
        }
        return isChange
    }

    return (
        <>
            <div className="space-y-4">
                {cards.map((card, i) => renderCard(card, i))}
                <AddMoreButton onClick={() => addCard()} label="Add lecture" />
            </div>
        </>
    )
}
