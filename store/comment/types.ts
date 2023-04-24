import { User } from '../user/types'

export interface Comment {
    _id: string
    lesson: string
    content: string
    like: number
    level: number
    createdAt: Date
    updatedAt: Date
    replies: Comment[]
    user: User
}
