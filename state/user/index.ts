import { User } from '../../constants/interfaces'
import { createSlice } from '@reduxjs/toolkit'
import { dataUser } from '@/data/users'

const initialState: User = dataUser

export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {},
})

export default userSlice.reducer
