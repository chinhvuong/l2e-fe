import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CourseDetailState } from './types'
import { dataRatings } from '@/data/ratings'

const initialState: CourseDetailState = {
    courseDetail: {
        _id: '',
        name: '',
        overview: '',
        description: '',
        price: 0,
        rating: null,
        review: null,
        students: null,
        language: '',
        requirements: [],
        goals: [],
        thumbnail: null,
        include: {
            duration: '',
            resource: '',
            assignments: '',
            certificate: '',
            lifetimeAccess: '',
            device: '',
            articles: '',
            exercise: '',
        },
        category: '',
        updatedAt: '',
    },
    reviews: dataRatings,
}

// thêm 1 trường là promotional

export const courseDetailSlice = createSlice({
    name: 'courseDetailSlice',
    initialState,
    reducers: {
        updateCourseName(state, action: PayloadAction<string>) {
            state.courseDetail.name = action.payload
        },
        updateCourseCategory(state, action: PayloadAction<string>) {
            state.courseDetail.category = action.payload
        },
        updateCourseOverview(state, action: PayloadAction<string>) {
            state.courseDetail.overview = action.payload
        },
        updateCourseLanguage(state, action: PayloadAction<string>) {
            state.courseDetail.language = action.payload
        },
        updateCoursePrice(state, action: PayloadAction<number>) {
            state.courseDetail.price = action.payload
        },
        updateCourseDescription(state, action: PayloadAction<string>) {
            state.courseDetail.description = action.payload
        },
        updateCourseThumbnail(state, action: PayloadAction<string>) {
            state.courseDetail.thumbnail = action.payload
        },
    },
})

export const {
    updateCourseName,
    updateCourseCategory,
    updateCourseOverview,
    updateCourseLanguage,
    updateCoursePrice,
    updateCourseDescription,
    updateCourseThumbnail,
} = courseDetailSlice.actions

export default courseDetailSlice.reducer
