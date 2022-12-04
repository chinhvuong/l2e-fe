import { courseCurriculumSlice } from './course/curriculum/index'
import { userSlice } from './user/index'
import { configureStore } from '@reduxjs/toolkit'
import { courseIntendedLearnersSlice } from './course/intended-learners'
import { courseDetailSlice } from './course'

export const store = configureStore({
    reducer: {
        courseDetail: courseDetailSlice.reducer,
        intendedLearners: courseIntendedLearnersSlice.reducer,
        curriculum: courseCurriculumSlice.reducer,
        user: userSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
