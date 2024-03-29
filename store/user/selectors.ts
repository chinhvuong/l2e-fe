import { RootState } from '..'

export const getInstructorInfo = (state: RootState) => {
    return state.user.user
}

export const getLoginState = (state: RootState) => {
    return state.user.isLogin
}

export const getAssetState = (state: RootState) => {
    return state.user.asset
}

export const getTokenBalanceState = (state: RootState) => {
    return state.user.asset.tokenBalance
}

export const getClaimState = (state: RootState) => {
    return state.user.isClaimDaily
}

export const getGlobalLoadingState = (state: RootState) => {
    return state.user.globalLoading
}

export const getUserProfile = (state: RootState) => {
    return state.user.user
}

export const getBioLength = (state: RootState) => {
    return state.user.bioLength
}
