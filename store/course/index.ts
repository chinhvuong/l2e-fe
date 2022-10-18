import { dataCourses_detail } from '../../data/course-detail'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CourseDetailState, TWhatYouWillLearnUpdate } from './types'
import { dataRatings } from '@/data/ratings'

const initialState: CourseDetailState = {
    whatYouWillLearn: [
        {
            id: 1,
            placeholder:
                'Example: Define the roles and responsibilities of a project manager.',
            content: '',
        },
        {
            id: 2,
            placeholder: 'Example: Estimate project timelines and budgets.',
            content: '',
        },
        {
            id: 3,
            placeholder: 'Example: Identify and manage project risks.',
            content: '',
        },
        {
            id: 4,
            placeholder: 'Example: Complete a case study to manage a project.',
            content: '',
        },
    ],
    courseDetail: dataCourses_detail,
    reviews: dataRatings,
}

// cards.length => uuid !!!!!!!!!!!!!!!

export const courseSlice = createSlice({
    name: 'courseSlice',
    initialState,
    reducers: {
        addWhatYouWillLearn(state) {
            state.whatYouWillLearn.push({
                id: state.whatYouWillLearn.length + 1,
                placeholder: 'Insert a learning objective or outcome',
                content: '',
            })
        },
        updateWhatYouWillLearn(
            state,
            action: PayloadAction<TWhatYouWillLearnUpdate>,
        ) {
            state.whatYouWillLearn[action.payload.id].content =
                action.payload.content
        },
        deleteWhatYouWillLearn(state, action: PayloadAction<number>) {
            state.whatYouWillLearn.splice(action.payload, 1)
        },
    },
})

export const {
    addWhatYouWillLearn,
    updateWhatYouWillLearn,
    deleteWhatYouWillLearn,
} = courseSlice.actions

export default courseSlice.reducer
