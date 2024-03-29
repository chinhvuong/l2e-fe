import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User, UserState } from './types'

const initialState: UserState = {
    user: {
        _id: '638610e6d308cc1b3f485e99',
        walletAddress: '',
        createdAt: '',
        updatedAt: '',
        name: '',
        title: '',
        bio: '',
        rating: 0,
        courses: [],
        avatar: '',
        nonce: 0,
    },
    isLogin: false,
    asset: {
        approve: 0,
        balance: 0,
        tokenBalance: 0,
    },
    isClaimDaily: false,
    globalLoading: false,
    bioLength: 0,
}

export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        updateLoginState(state, action: PayloadAction<boolean>) {
            state.isLogin = action.payload
        },
        updateUserInfo(state, action: PayloadAction<User>) {
            state.user = action.payload
        },
        updateTokenBalance(state, action: PayloadAction<number>) {
            state.asset.tokenBalance = action.payload
        },
        updateAssetState(
            state,
            action: PayloadAction<{ approve?: number; balance?: number }>,
        ) {
            const newS = { ...state.asset }
            if (action.payload?.approve !== undefined) {
                newS.approve = action.payload.approve
            }
            if (action.payload?.balance !== undefined) {
                newS.balance = action.payload.balance
            }
            state.asset = newS
        },
        updateClaimDailyState(state, action: PayloadAction<boolean>) {
            state.isClaimDaily = action.payload
        },
        updateUserNameState(state, action: PayloadAction<string>) {
            state.user.name = action.payload
        },
        updateUserAvatarState(state, action: PayloadAction<string>) {
            state.user.avatar = action.payload
        },
        updateUserTitleState(state, action: PayloadAction<string>) {
            state.user.title = action.payload
        },
        updateUserBioState(state, action: PayloadAction<string>) {
            state.user.bio = action.payload
        },
        updateUserBioLength(state, action: PayloadAction<number>) {
            state.bioLength = action.payload
        },
        updateGlobalLoadingState(state, action: PayloadAction<boolean>) {
            state.globalLoading = action.payload
        },
    },
})

export const {
    updateUserInfo,
    updateLoginState,
    updateTokenBalance,
    updateAssetState,
    updateClaimDailyState,
    updateUserAvatarState,
    updateUserNameState,
    updateUserBioState,
    updateUserTitleState,
    updateUserBioLength,
    updateGlobalLoadingState,
} = userSlice.actions

export default userSlice.reducer
