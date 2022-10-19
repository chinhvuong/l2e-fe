import { useAppDispatch, useAppSelector } from '@/hooks'
import { TInput } from '@/store/course/types'
import { useEffect, useState } from 'react'
import { useCallback } from 'react'
import { IDragAndDropProps } from '.'
import AddMoreButton from './add-button'
import { Card } from './card'

export interface ContainerState {
    cards: TInput[]
}

export const Container = ({
    addItem,
    updateItem,
    updateOrderItems,
    deleteItem,
    getItems,
    defaultInputBlock,
}: IDragAndDropProps) => {
    const cardsFromStore = useAppSelector(getItems)
    const [cards, setCards] = useState(cardsFromStore)
    const [cardsOrder, setCardsOrder] = useState(cards.map((item) => item.id))
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
        if (cardsFromStore.every((item) => item.content !== '')) {
            dispatch(addItem())
        }
    }

    const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
        setCards((prevCards: TInput[]) => {
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

    const renderCard = useCallback(
        (card: { id: string; placeholder: string }, index: number) => {
            return (
                <Card
                    key={card.id}
                    index={index}
                    id={card.id}
                    placeholder={card.placeholder}
                    moveCard={moveCard}
                    updateCard={updateItem}
                    deleteCard={deleteItem}
                    getCards={getItems}
                    defaultInputBlock={defaultInputBlock}
                />
            )
        },
        [],
    )

    const isChangeCardsOrder = () => {
        const newOrder = [...cardsOrder]
        let isChange = false
        for (let i = 0; i < cards.length; i++) {
            if (cards[i].id !== cardsFromStore[i].id) {
                newOrder[i] = cards[i].id
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
            </div>
            <AddMoreButton onClick={() => addCard()} />
        </>
    )
}
