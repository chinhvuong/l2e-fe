import update from 'immutability-helper'
import type { FC } from 'react'
import { useCallback, useState } from 'react'
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
        const [cards, setCards] = useState([
            {
                id: 1,
                placeholder:
                    'Example: Define the roles and responsibilities of a project manager.',
                content: '',
            },
            {
                id: 2,
                placeholder: 'Example: Estimate project timelines and budgets.',
                content: '',
            },
            {
                id: 3,
                placeholder: 'Example: Identify and manage project risks.',
                content: '',
            },
            {
                id: 4,
                placeholder:
                    'Example: Complete a case study to manage a project.',
                content: '',
            },
        ])

        const moveCard = useCallback(
            (dragIndex: number, hoverIndex: number) => {
                setCards((prevCards: Item[]) =>
                    update(prevCards, {
                        $splice: [
                            [dragIndex, 1],
                            [hoverIndex, 0, prevCards[dragIndex] as Item],
                        ],
                    }),
                )
            },
            [],
        )

        const deleteCard = useCallback((index: number) => {
            console.log(cards)
            if (cards.length > 4) {
                setCards((prevCards: Item[]) =>
                    update(prevCards, {
                        $splice: [[index, 1]],
                    }),
                )
            }
        }, [])

        const addCard = () => {
            const addNewCard = cards.every((item) => item.content !== '')
            if (addNewCard) {
                setCards((prevCards: Item[]) =>
                    update(prevCards, {
                        [cards.length + 1]: {
                            $set: {
                                id: cards.length + 1,
                                placeholder:
                                    'Insert a learning objective or outcome',
                                content: '',
                            },
                        },
                    }),
                )
            }
        }

        const updateCard = (index: number, content: string) => {
            console.log('content', index, content)
            setCards((prevCards: Item[]) =>
                update(prevCards, {
                    [index]: {
                        content: {
                            $set: content,
                        },
                    },
                }),
            )
        }

        const renderCard = useCallback(
            (card: { id: number; placeholder: string }, index: number) => {
                return (
                    <Card
                        key={card.id}
                        index={index}
                        id={card.id}
                        placeholder={card.placeholder}
                        moveCard={moveCard}
                        updateCard={updateCard}
                        deleteCard={deleteCard}
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
