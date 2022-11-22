import { useAppDispatch, useAppSelector } from '@/hooks'
import {
    updateRequirementsState,
    updateWhatYouWillLearnState,
} from '@/store/course/intended-learners'
import { getAllIntendedLearners } from '@/store/course/intended-learners/selectors'
import { TInput } from '@/store/course/intended-learners/types'
import { useEffect, useState } from 'react'
import { useCallback } from 'react'
import { IDragAndDropInputProps } from '.'
import AddMoreButton from '../../../../../components/core/button/add-button'
import { Card } from './card'

export const Container = ({
    name,
    addItem,
    updateItem,
    updateItemToPayload,
    updateOrderItems,
    deleteItem,
    getItems,
    getUpdateState,
    defaultInputBlock,
}: IDragAndDropInputProps) => {
    const cardsFromStore = useAppSelector(getItems)
    const [cards, setCards] = useState(cardsFromStore)
    const [cardsOrder, setCardsOrder] = useState(cards.map((item) => item.id))
    const dispatch = useAppDispatch()
    const isUpdate = useAppSelector(getUpdateState)
    const intendedLearners = useAppSelector(getAllIntendedLearners)

    useEffect(() => {
        setCards(cardsFromStore)
    }, [cardsFromStore])

    useEffect(() => {
        isChangeCardsOrder()
    }, [cards])

    useEffect(() => {
        dispatch(updateOrderItems(cardsOrder))
    }, [cardsOrder])

    useEffect(() => {
        if (isUpdate) {
            if (name === 'What you will learn') {
                dispatch(
                    updateItemToPayload(
                        intendedLearners.whatYouWillLearn.map(
                            (item) => item.content,
                        ),
                    ),
                )
                dispatch(updateWhatYouWillLearnState(false))
            } else if (name === 'Requirements') {
                dispatch(
                    updateItemToPayload(
                        intendedLearners.requirements.map(
                            (item) => item.content,
                        ),
                    ),
                )
                dispatch(updateRequirementsState(false))
            }
        }
    }, [isUpdate])

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

    const renderCard = useCallback((card: TInput, index: number) => {
        return (
            <Card
                key={card.id}
                index={index}
                id={card.id}
                name={name}
                defaultValue={card.content}
                placeholder={card.placeholder}
                moveCard={moveCard}
                updateCard={updateItem}
                deleteCard={deleteItem}
                getCards={getItems}
                defaultInputBlock={defaultInputBlock}
            />
        )
    }, [])

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
            <AddMoreButton onClick={() => addCard()} label="Add more" />
        </>
    )
}
