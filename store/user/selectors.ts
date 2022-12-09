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
