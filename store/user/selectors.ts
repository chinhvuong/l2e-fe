import { RootState } from '..'

export const getInstructorInfo = (state: RootState) => {
    return state.user.user
}

export const getWalletAddress = (state: RootState) => {
    return state.user.walletAddress
}
