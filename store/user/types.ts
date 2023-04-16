export interface User {
    _id: string
    walletAddress: string
    createdAt: Date
    updatedAt: Date
    name: string
    title: string
    bio: string
    rating: number
    courses?: number[]
    avatar: string
    nonce: number
}

export interface UserState {
    user: User
    isLogin: boolean
    asset: {
        approve: number
        balance: number
        tokenBalance: number
    }
    isClaimDaily: boolean
}
