export interface User {
    _id: number
    walletAddress: string
    createdAt: Date
    updatedAt: Date
    name: string
    title: string
    bio: string
    rating: number
    courses: number[]
    avatar: string
}

export interface UserState {
    user: User
    isLogin: boolean
    asset: {
        approve: number
        balance: number
    }
    balance: number
}
