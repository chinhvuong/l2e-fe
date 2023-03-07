import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CourseDetail, CourseDetailState } from './types'
import { dataRatings } from '@/data/ratings'

const initialState: CourseDetailState = {
    courseDetail: {
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
        _id: '',
        owner: '',
        author: {
            _id: '',
            __v: 0,
            avatar: null,
            bio: null,
            createdAt: '2022-10-25T04:10:15.411Z',
            name: null,
            nonce: 0,
            rating: 0,
            title: null,
            updatedAt: '2022-10-25T04:10:15.411Z',
            walletAddress: '123',
        },
        name: '',
        overview: '',
        description: '',
        price: 0,
        rating: 0,
        reviews: 0,
        language: 'en',
        approved: false,
        requirements: [],
        goals: [],
        thumbnail:
            'https://img-c.udemycdn.com/course/750x422/437398_46c3_10.jpg',
        promotionalVideo: '',
        category: '',
        createdAt: '2022-10-25T04:10:15.411Z',
        updatedAt: '2022-11-19T17:18:50.955Z',
        __v: 0,
        students: 0,
        courseId: 0,
        sections: [],
        lastApproveRequestAt: new Date(
            new Date().setDate(new Date().getDate() - 1),
        ).toISOString(),
    },
    reviews: dataRatings,
    isEnroll: false,
    isSaved: false,
    isLoading: false,
    canSaveCourse: true,
    canCreateCourse: true,
    descriptionLength: 0,
}

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
        updateCoursePromotionalVideo(state, action: PayloadAction<string>) {
            state.courseDetail.promotionalVideo = action.payload
        },
        updateCourseGoals(state, action: PayloadAction<string[]>) {
            state.courseDetail.goals = [...action.payload]
        },
        updateCourseRequirements(state, action: PayloadAction<string[]>) {
            state.courseDetail.requirements = [...action.payload]
        },
        updateCourseDetail(state, action: PayloadAction<CourseDetail>) {
            state.courseDetail = { ...action.payload }
        },
        updateEnrollStatus(state, action: PayloadAction<boolean>) {
            state.isEnroll = action.payload
        },
        updateSaveCourseState(state, action: PayloadAction<boolean>) {
            state.isSaved = action.payload
        },
        updateLoadingState(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload
        },
        updateCanSaveCourseState(state, action: PayloadAction<boolean>) {
            state.canSaveCourse = action.payload
        },
        updateCanCreateCourseState(state, action: PayloadAction<boolean>) {
            state.canCreateCourse = action.payload
        },
        updateDescriptionLength(state, action: PayloadAction<number>) {
            state.descriptionLength = action.payload
        },
        updateCourseIdState(state, action: PayloadAction<number>) {
            state.courseDetail.courseId = action.payload
        },
        updateIdState(state, action: PayloadAction<string>) {
            state.courseDetail._id = action.payload
        },
        resetCourseDetailStore() {
            return initialState
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
    updateCoursePromotionalVideo,
    updateCourseGoals,
    updateCourseRequirements,
    updateCourseDetail,
    updateEnrollStatus,
    updateSaveCourseState,
    updateLoadingState,
    updateCanSaveCourseState,
    updateCanCreateCourseState,
    updateDescriptionLength,
    updateCourseIdState,
    updateIdState,
    resetCourseDetailStore,
} = courseDetailSlice.actions

export default courseDetailSlice.reducer
