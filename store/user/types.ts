export interface User {
    _id: string
    walletAddress: string
    createdAt: string
    updatedAt: string
    name: string | null
    title: string | null
    bio: string | null
    rating: number
    courses?: number[]
    avatar: string | null
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
    globalLoading: boolean
    bioLength: number
}
