import { dataCourses_detail } from '../../data/course-detail'
import { createSlice } from '@reduxjs/toolkit'
import { CourseDetailState } from './types'
import { dataRatings } from '@/data/ratings'

const initialState: CourseDetailState = {
    courseDetail: dataCourses_detail,
    reviews: dataRatings,
}

export const courseSlice = createSlice({
    name: 'courseSlice',
    initialState,
    reducers: {},
})

export default courseSlice.reducer
