import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CourseDetailState } from './types'
import { dataRatings } from '@/data/ratings'
import { dataCourses_detail } from '@/data/course-detail'

const initialState: CourseDetailState = {
    courseDetail: dataCourses_detail,
    reviews: dataRatings,
}

export const courseDetailSlice = createSlice({
    name: 'courseDetailSlice',
    initialState,
    reducers: {
        updateCourseName(state, action: PayloadAction<string>) {
            state.courseDetail.name = action.payload
        },
        updateCourseCategory(state, action: PayloadAction<number>) {
            state.courseDetail.category = action.payload
        },
    },
})

export default courseDetailSlice.reducer
