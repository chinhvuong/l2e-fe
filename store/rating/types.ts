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
