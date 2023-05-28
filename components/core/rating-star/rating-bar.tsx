import { faStar as faEmptyStar } from '@fortawesome/free-regular-svg-icons'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'

export interface IRatingBarProps {
    selectedRatingPoint: number
    setRating: React.Dispatch<React.SetStateAction<number>>
}

export default function RatingBar({
    selectedRatingPoint,
    setRating,
}: IRatingBarProps) {
    const [draftRatingPoint, setDraftRatingPoint] =
        useState(selectedRatingPoint)
    const totalStars = [1, 2, 3, 4, 5]
    const starDescription = [
        'What do you think?',
        'Awful, not what I expected at all',
        'Poor, pretty disappointed',
        'Average, could be better',
        'Good, what I expected',
        'Amazing, above expectations!',
    ]

    const handleSetSelectedRatingPoint = (value: number): void => {
        setRating(value)
        setDraftRatingPoint(value)
    }

    const handleSetDraftRatingPoint = (value: number): void => {
        setDraftRatingPoint(value)
    }

    return (
        <div className="flex flex-col items-center">
            <div className="text-xl font-bold">Rate this course:</div>
            <div className="pt-5 pb-10">
                <div className="flex flex-col items-center space-y-3">
                    <div>{starDescription[draftRatingPoint]}</div>
                    <div className="flex items-center">
                        {totalStars.map((item) => {
                            return (
                                <div
                                    key={item}
                                    onClick={() =>
                                        handleSetSelectedRatingPoint(item)
                                    }
                                    onMouseOver={() =>
                                        handleSetDraftRatingPoint(item)
                                    }
                                    onMouseOut={() =>
                                        handleSetDraftRatingPoint(
                                            selectedRatingPoint,
                                        )
                                    }
                                    className="px-1"
                                >
                                    {item <= draftRatingPoint ? (
                                        <FontAwesomeIcon
                                            icon={faStar}
                                            className="text-star sm:text-xs 2xl:text-3xl cursor-pointer"
                                        />
                                    ) : (
                                        <FontAwesomeIcon
                                            icon={faEmptyStar}
                                            className="text-star sm:text-xs 2xl:text-3xl cursor-pointer"
                                        />
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
