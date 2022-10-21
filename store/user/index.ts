import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { dataUser } from '@/data/users'
import { UserState } from './types'

const initialState: UserState = {
    user: dataUser,
    accessToken: '',
    refreshToken: '',
}

export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        setAccessToken(state, action: PayloadAction<string>) {
            state.accessToken = action.payload
        },
        setRefreshToken(state, action: PayloadAction<string>) {
            state.refreshToken = action.payload
        },
    },
})

export const { setAccessToken, setRefreshToken } = userSlice.actions

export default userSlice.reducer
