import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons'
import { faStar as faEmptyStar } from '@fortawesome/free-regular-svg-icons'
import { Category } from '@/interfaces'
import Label from '@/components/core/label'

export interface ICourseCardProps {
    thumbnail: string
    title: string
    authors: string
    rating: number
    students: string
    price: string
    isBestseller: boolean
    category: Category
}

export default function CourseCard(props: ICourseCardProps) {
    const ratingStar = () => {
        if (0 <= props.rating && props.rating <= 5) {
            let ratingStar = props.rating
            const aStar = []
            let halfStar = false
            const emptyStar = []
            for (let i = 0; i < 5; i++) {
                if (ratingStar >= 1) {
                    ratingStar--
                    aStar.push(
                        <FontAwesomeIcon icon={faStar} className="text-star" />,
                    )
                } else if (0 < ratingStar && ratingStar < 1) {
                    ratingStar = 0
                    halfStar = true
                } else if (ratingStar === 0) {
                    emptyStar.push(
                        <FontAwesomeIcon
                            icon={faEmptyStar}
                            className="text-star"
                        />,
                    )
                }
            }
            return (
                <div className="flex items-center mb-1">
                    {aStar.map((star) => star)}
                    {halfStar && (
                        <FontAwesomeIcon
                            icon={faStarHalfStroke}
                            className="text-star"
                        />
                    )}
                    {emptyStar.map((star) => star)}
                </div>
            )
        }
        return <div>Error</div>
    }

    return (
        <div className="space-y-3 w-[240px]">
            <img src={props.thumbnail} alt="" />
            <div className="font-semibold text-lg">{props.title}</div>
            <div className="font-light text-xs">{props.authors}</div>
            <div className="flex items-center space-x-2">
                <div className="font-bold text-xs text-star">
                    {Number(props.rating).toFixed(1)}
                </div>
                {ratingStar()}
                <div className="font-light text-xs">{`(${props.students})`}</div>
            </div>
            <div className="font-bold">{props.price}</div>
            <div className="flex gap-x-2">
                <Label type="bestseller" hidden={!props.isBestseller} />
                <Label type={props.category} />
            </div>
        </div>
    )
}
