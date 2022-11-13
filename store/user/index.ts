import { createSlice } from '@reduxjs/toolkit'
import { dataUser } from '@/data/users'
import { UserState } from './types'

const initialState: UserState = {
    user: dataUser,
}

export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {},
})

export default userSlice.reducer
