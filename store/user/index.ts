import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { dataUser } from '@/data/users'
import { UserState } from './types'

const initialState: UserState = {
    user: dataUser,
    isLogin: false,
    asset: {
        approve: 0,
        balance: 0,
    },
    balance: 0,
}

export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        updateLoginState(state, action: PayloadAction<boolean>) {
            state.isLogin = action.payload
        },
        updateUserBalance(state, action: PayloadAction<number>) {
            state.balance = action.payload
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
    },
})

export const { updateLoginState, updateUserBalance, updateAssetState } =
    userSlice.actions

export default userSlice.reducer
