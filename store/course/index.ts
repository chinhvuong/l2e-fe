import { dataCourses_detail } from '../../data/course-detail'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CourseDetailState, TInputUpdate } from './types'
import { dataRatings } from '@/data/ratings'
import { v4 as uuidv4 } from 'uuid'

const initialState: CourseDetailState = {
    whatYouWillLearn: [
        {
            id: uuidv4(),
            placeholder:
                'Example: Define the roles and responsibilities of a project manager.',
            content: '',
        },
        {
            id: uuidv4(),
            placeholder: 'Example: Estimate project timelines and budgets.',
            content: '',
        },
        {
            id: uuidv4(),
            placeholder: 'Example: Identify and manage project risks.',
            content: '',
        },
        {
            id: uuidv4(),
            placeholder: 'Example: Complete a case study to manage a project.',
            content: '',
        },
    ],
    requirements: [
        {
            id: uuidv4(),
            placeholder:
                'Example: No programming experience needed. You will learn everything you need to know.',
            content: '',
        },
    ],
    intendedLearners: [
        {
            id: uuidv4(),
            placeholder:
                'Example: Beginner Python developers curious about data science.',
            content: '',
        },
    ],
    courseDetail: dataCourses_detail,
    reviews: dataRatings,
}

export const courseSlice = createSlice({
    name: 'courseSlice',
    initialState,
    reducers: {
        addWhatYouWillLearn(state) {
            state.whatYouWillLearn.push({
                id: uuidv4(),
                placeholder: 'Insert a learning objective or outcome',
                content: '',
            })
        },
        updateWhatYouWillLearn(state, action: PayloadAction<TInputUpdate>) {
            for (let i = 0; i < state.whatYouWillLearn.length; i++) {
                if (state.whatYouWillLearn[i].id === action.payload.id) {
                    state.whatYouWillLearn[i].content = action.payload.content
                }
            }
        },
        updateOrderWhatYouWillLearn(state, action: PayloadAction<string[]>) {
            const prevState = [...state.whatYouWillLearn]
            for (let i = 0; i < state.whatYouWillLearn.length; i++) {
                state.whatYouWillLearn[i] =
                    prevState.find((item) => {
                        if (item.id === action.payload[i]) {
                            return item
                        }
                    }) ?? prevState[i]
            }
        },
        deleteWhatYouWillLearn(state, action: PayloadAction<number>) {
            state.whatYouWillLearn.splice(action.payload, 1)
        },
        addRequirements(state) {
            state.requirements.push({
                id: uuidv4(),
                placeholder: 'Insert a requirement or prerequisite',
                content: '',
            })
        },
        updateRequirements(state, action: PayloadAction<TInputUpdate>) {
            for (let i = 0; i < state.requirements.length; i++) {
                if (state.requirements[i].id === action.payload.id) {
                    state.requirements[i].content = action.payload.content
                }
            }
        },
        updateOrderRequirements(state, action: PayloadAction<string[]>) {
            const prevState = [...state.requirements]
            for (let i = 0; i < state.requirements.length; i++) {
                state.requirements[i] =
                    prevState.find((item) => {
                        if (item.id === action.payload[i]) {
                            return item
                        }
                    }) ?? prevState[i]
            }
        },
        deleteRequirements(state, action: PayloadAction<number>) {
            state.requirements.splice(action.payload, 1)
        },
        addIntendedLearners(state) {
            state.intendedLearners.push({
                id: uuidv4(),
                placeholder: 'Insert a requirement or prerequisite',
                content: '',
            })
        },
        updateIntendedLearners(state, action: PayloadAction<TInputUpdate>) {
            for (let i = 0; i < state.intendedLearners.length; i++) {
                if (state.intendedLearners[i].id === action.payload.id) {
                    state.intendedLearners[i].content = action.payload.content
                }
            }
        },
        updateOrderIntendedLearners(state, action: PayloadAction<string[]>) {
            const prevState = [...state.intendedLearners]
            for (let i = 0; i < state.intendedLearners.length; i++) {
                state.intendedLearners[i] =
                    prevState.find((item) => {
                        if (item.id === action.payload[i]) {
                            return item
                        }
                    }) ?? prevState[i]
            }
        },
        deleteIntendedLearners(state, action: PayloadAction<number>) {
            state.intendedLearners.splice(action.payload, 1)
        },
    },
})

export const {
    addWhatYouWillLearn,
    updateWhatYouWillLearn,
    updateOrderWhatYouWillLearn,
    deleteWhatYouWillLearn,
    addRequirements,
    updateRequirements,
    updateOrderRequirements,
    deleteRequirements,
    addIntendedLearners,
    updateIntendedLearners,
    updateOrderIntendedLearners,
    deleteIntendedLearners,
} = courseSlice.actions

export default courseSlice.reducer
