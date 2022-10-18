import { useAppDispatch, useAppSelector } from '@/hooks'
import {
    addWhatYouWillLearn,
    // deleteWhatYouWillLearn,
    // updateWhatYouWillLearn,
} from '@/store/course'
import { getWhatYouWillLearnForm } from '@/store/course/selectors'
// import update from 'immutability-helper'
import type { FC } from 'react'
import { useCallback } from 'react'
import AddMoreButton from './add-button'
import { Card } from './card'

export interface Item {
    id: number
    placeholder: string
    content: string
}

export interface ContainerState {
    cards: Item[]
}

export const Container: FC = () => {
    {
        const cards = useAppSelector(getWhatYouWillLearnForm)
        const dispatch = useAppDispatch()

        const addCard = () => {
            dispatch(addWhatYouWillLearn())
        }

        // const updateCard = (id: number, content: string) => {
        //     dispatch(updateWhatYouWillLearn({ id: id, content: content }))
        // }

        // const deleteCard = (id: number) => {
        //     dispatch(deleteWhatYouWillLearn(id))
        // }

        // const moveCard = useCallback(
        //     (dragIndex: number, hoverIndex: number) => {
        //         setCards((prevCards: Item[]) =>
        //             update(prevCards, {
        //                 $splice: [
        //                     [dragIndex, 1],
        //                     [hoverIndex, 0, prevCards[dragIndex] as Item],
        //                 ],
        //             }),
        //         )
        //     },
        //     [],
        // )

        const moveCard = () => {}

        const renderCard = useCallback(
            (card: { id: number; placeholder: string }, index: number) => {
                return (
                    <Card
                        key={card.id}
                        index={index}
                        id={card.id}
                        placeholder={card.placeholder}
                        moveCard={moveCard}
                    />
                )
            },
            [],
        )

        return (
            <>
                <div className="space-y-4">
                    {cards.map((card, i) => renderCard(card, i))}
                </div>
                <AddMoreButton onClick={() => addCard()} />
            </>
        )
    }
}
