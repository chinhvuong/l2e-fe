import { userSlice } from './user/index'
import { configureStore } from '@reduxjs/toolkit'
import { courseSlice } from './course'

export const store = configureStore({
    reducer: {
        course: courseSlice.reducer,
        user: userSlice.reducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
