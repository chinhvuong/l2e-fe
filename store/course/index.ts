import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { QuizDetailType } from '../quiz/types'
import { CourseDetail, CourseDetailState } from './types'

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
        finalTest: {
            _id: '',
            questions: [
                {
                    _id: '',
                    question: '',
                    choices: [''],
                    correctAnswer: 0,
                    courseId: '',
                    medias: [''],
                },
            ],
            courseId: '',
            name: '',
            createdAt: '',
            updatedAt: '',
        },
        _id: '',
        owner: '',
        author: {
            _id: '',
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
        thumbnail: '/images/placeholder.jpeg',
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
    reviews: [],
    isEnroll: false,
    isSaved: false,
    isUploadingThumbnail: false,
    isUploadingPromotionalVideo: false,
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
        updateCanCreateCourseState(state, action: PayloadAction<boolean>) {
            state.canCreateCourse = action.payload
        },
        updateUploadingThumbnailState(state, action: PayloadAction<boolean>) {
            state.isUploadingThumbnail = action.payload
        },
        updateUploadingPromotionalVideoState(
            state,
            action: PayloadAction<boolean>,
        ) {
            state.isUploadingPromotionalVideo = action.payload
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
        updateFinaltestState(state, action: PayloadAction<QuizDetailType>) {
            state.courseDetail.finalTest = action.payload
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
    updateCanCreateCourseState,
    updateDescriptionLength,
    updateCourseIdState,
    updateIdState,
    resetCourseDetailStore,
    updateFinaltestState,
    updateUploadingThumbnailState,
    updateUploadingPromotionalVideoState,
} = courseDetailSlice.actions

export default courseDetailSlice.reducer
