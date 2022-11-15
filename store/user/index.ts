import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { dataUser } from '@/data/users'
import { UserState } from './types'

const initialState: UserState = {
    user: dataUser,
    isLogin: false,
}

export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        updateLoginState(state, action: PayloadAction<boolean>) {
            state.isLogin = action.payload
        },
    },
})

export const { updateLoginState } = userSlice.actions

export default userSlice.reducer
