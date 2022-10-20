import { createSlice } from '@reduxjs/toolkit'
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
    reducers: {},
})

export default courseDetailSlice.reducer
