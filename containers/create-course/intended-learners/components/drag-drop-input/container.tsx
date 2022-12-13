import { useAppDispatch, useAppSelector } from '@/hooks'
import {
    updateOrderRequirements,
    updateOrderWhatYouWillLearn,
    updateRequirementsState,
    updateWhatYouWillLearnState,
} from '@/store/course/intended-learners'
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
    deleteItem,
    getItems,
    getUpdateState,
    defaultInputBlock,
}: IDragAndDropInputProps) => {
    const cardsFromStore = useAppSelector(getItems)
    const [cards, setCards] = useState(cardsFromStore)
    const dispatch = useAppDispatch()
    const isUpdate = useAppSelector(getUpdateState)

    useEffect(() => {
        setCards(cardsFromStore)
    }, [cardsFromStore])

    useEffect(() => {
        if (isUpdate) {
            if (name === 'What you will learn') {
                dispatch(
                    updateItemToPayload(
                        cardsFromStore.map((item) => item.content),
                    ),
                )
                dispatch(updateWhatYouWillLearnState(false))
            } else if (name === 'Requirements') {
                dispatch(
                    updateItemToPayload(
                        cardsFromStore.map((item) => item.content),
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
        let newCards: TInput[] = []
        setCards((prevCards: TInput[]) => {
            newCards = [...prevCards]

            // dragCard is card we are dragging
            const dragCard = newCards[dragIndex]

            // removing this dragCard from array
            newCards.splice(dragIndex, 1)

            // insert dragCard at hover position
            newCards.splice(hoverIndex, 0, dragCard)
            return newCards
        })
        if (name === 'What you will learn') {
            dispatch(updateOrderWhatYouWillLearn(newCards))
        } else if (name === 'Requirements') {
            dispatch(updateOrderRequirements(newCards))
        }
        dispatch(updateItemToPayload(newCards.map((item) => item.content)))
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

    return (
        <>
            <div className="space-y-4">
                {cards.map((card, i) => renderCard(card, i))}
            </div>
            <AddMoreButton onClick={() => addCard()} label="Add more" />
        </>
    )
}
