import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons'
import { faStar as faEmptyStar } from '@fortawesome/free-regular-svg-icons'

export interface IRatingStarProps {
    id: string
    ratingScore: number
    ratings?: string
    hideScore?: boolean
    hideRating?: boolean
    className?: string
}

export default function RatingStar(props: IRatingStarProps) {
    const ratingStar = () => {
        if (0 <= props.ratingScore && props.ratingScore <= 5) {
            let ratingStar = props.ratingScore
            const aStar = []
            let halfStar = false
            const emptyStar = []
            for (let i = 0; i < 5; i++) {
                if (ratingStar >= 1) {
                    ratingStar--
                    aStar.push(
                        <FontAwesomeIcon
                            icon={faStar}
                            className="text-star sm:text-xs"
                            key={props.id + i}
                        />,
                    )
                } else if (0 < ratingStar && ratingStar < 1) {
                    ratingStar = 0
                    halfStar = true
                } else if (ratingStar === 0) {
                    emptyStar.push(
                        <FontAwesomeIcon
                            icon={faEmptyStar}
                            className="text-star sm:text-xs"
                            key={props.id + i}
                        />,
                    )
                }
            }
            return (
                <div className="flex items-center mb-1 space-x-1">
                    {aStar.map((star) => star)}
                    {halfStar && (
                        <FontAwesomeIcon
                            icon={faStarHalfStroke}
                            className="text-star sm:text-xs"
                        />
                    )}
                    {emptyStar.map((star) => star)}
                </div>
            )
        }
        return <div>Error</div>
    }
    return (
        <div className={`flex items-center space-x-2 ${props.className}`}>
            {!props?.hideScore && (
                <div className="font-bold text-xs text-star">
                    {Number(props.ratingScore).toFixed(1)}
                </div>
            )}
            {ratingStar()}
            {props?.ratings && !props?.hideRating && (
                <div className="font-light text-xs">{`(${props.ratings})`}</div>
            )}
        </div>
    )
}
