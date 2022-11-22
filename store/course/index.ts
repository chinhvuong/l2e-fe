import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CourseDetail, CourseDetailState } from './types'
import { dataRatings } from '@/data/ratings'

const initialState: CourseDetailState = {
    courseDetail: {
        _id: '',
        owner: '',
        author: '',
        name: '',
        overview: '',
        description: '',
        price: 0,
        rating: null,
        reviews: null,
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
    isNewData: false,
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
        updateCourseGoals(state, action: PayloadAction<string[]>) {
            state.courseDetail.goals = [...action.payload]
        },
        updateCourseRequirements(state, action: PayloadAction<string[]>) {
            state.courseDetail.requirements = [...action.payload]
        },
        updateCourseDetail(state, action: PayloadAction<CourseDetail>) {
            state.courseDetail._id = action.payload._id
            state.courseDetail.owner = action.payload.owner
            state.courseDetail.author = action.payload.author
            state.courseDetail.name = action.payload.name
            state.courseDetail.overview = action.payload.overview
            state.courseDetail.description = action.payload.description
            state.courseDetail.price = action.payload.price
            state.courseDetail.rating = action.payload.rating
            state.courseDetail.reviews = action.payload.reviews
            state.courseDetail.students = action.payload.students
            state.courseDetail.language = action.payload.language
            state.courseDetail.requirements = action.payload.requirements
            state.courseDetail.goals = action.payload.goals
            state.courseDetail.thumbnail = action.payload.thumbnail
            if (action.payload.include) {
                state.courseDetail.include.duration =
                    action.payload.include.duration
                state.courseDetail.include.resource =
                    action.payload.include.resource
                state.courseDetail.include.assignments =
                    action.payload.include.assignments
                state.courseDetail.include.certificate =
                    action.payload.include.certificate
                state.courseDetail.include.lifetimeAccess =
                    action.payload.include.lifetimeAccess
                state.courseDetail.include.device =
                    action.payload.include.device
                state.courseDetail.include.articles =
                    action.payload.include.articles
                state.courseDetail.include.exercise =
                    action.payload.include.exercise
            }
            state.courseDetail.category = action.payload.category
            state.courseDetail.updatedAt = action.payload.updatedAt
        },
        updateGetCourseDetailState(state, action: PayloadAction<boolean>) {
            state.isNewData = action.payload
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
    updateCourseGoals,
    updateCourseRequirements,
    updateCourseDetail,
    updateGetCourseDetailState,
} = courseDetailSlice.actions

export default courseDetailSlice.reducer
