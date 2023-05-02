import { User } from '../user/types'

export interface Rating {
    _id: string
    course: string
    content: string
    rating: number
    createdAt: Date
    updatedAt: Date
    user: User
}

export interface RatingOverView {
    one: number
    two: number
    three: number
    four: number
    five: number
    overview: number
}
