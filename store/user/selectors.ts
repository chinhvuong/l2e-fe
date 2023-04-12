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
    return state.user.asset.tokenBallance
}

export const getClaimState = (state: RootState) => {
    return state.user.isClaimDaily
}
