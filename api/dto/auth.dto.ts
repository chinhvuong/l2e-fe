export interface AuthSubmit {
    walletAddress: string
    signature: string
}

export interface AuthResponse {
    refreshToken: string
    accessToken: string
}
