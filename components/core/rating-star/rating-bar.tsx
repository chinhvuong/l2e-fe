import { faStar as faEmptyStar } from '@fortawesome/free-regular-svg-icons'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'

export interface IRatingBarProps {}

export default function RatingBar(props: IRatingBarProps) {
    const [selectedRatingPoint, setSelectedRatingPoint] = useState(0)
    const [draftRatingPoint, setDraftRatingPoint] = useState(0)
    const totalStars = [1, 2, 3, 4, 5]

    const handleSetSelectedRatingPoint = (value: number): void => {
        setSelectedRatingPoint(value)
        setDraftRatingPoint(value)
    }

    const handleSetDraftRatingPoint = (value: number): void => {
        setDraftRatingPoint(value)
    }

    return (
        <div className={`flex items-center`}>
            {totalStars.map((item) => {
                return (
                    <div
                        key={item}
                        onClick={() => handleSetSelectedRatingPoint(item)}
                        onMouseEnter={() => handleSetDraftRatingPoint(item)}
                        onMouseLeave={() =>
                            setDraftRatingPoint(selectedRatingPoint)
                        }
                        className="px-1"
                    >
                        {item <= draftRatingPoint ? (
                            <FontAwesomeIcon
                                icon={faStar}
                                className="text-star sm:text-xs cursor-pointer"
                            />
                        ) : (
                            <FontAwesomeIcon
                                icon={faEmptyStar}
                                className="text-star sm:text-xs cursor-pointer"
                            />
                        )}
                    </div>
                )
            })}
        </div>
    )
}
