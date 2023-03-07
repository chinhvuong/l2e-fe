import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CourseIntendedLearnersState, TInput } from './types'
import { v4 as uuidv4 } from 'uuid'
import { TInputUpdate } from '../types'

const initialState: CourseIntendedLearnersState = {
    whatYouWillLearn: [
        {
            id: uuidv4(),
            placeholder: 'Insert a learning objective or outcome',
            content: '',
        },
        {
            id: uuidv4(),
            placeholder: 'Insert a learning objective or outcome',
            content: '',
        },
        {
            id: uuidv4(),
            placeholder: 'Insert a learning objective or outcome',
            content: '',
        },
        {
            id: uuidv4(),
            placeholder: 'Insert a learning objective or outcome',
            content: '',
        },
    ],
    requirements: [
        {
            id: uuidv4(),
            placeholder: 'Insert a requirement or prerequisite',
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
    isUpdateWhatYouWillLearn: false,
    isUpdateRequirements: false,
    isUpdateIntendedLearners: false,
}

export const courseIntendedLearnersSlice = createSlice({
    name: 'courseIntendedLearnersSlice',
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
        updateAllWhatYouWillLearn(state, action: PayloadAction<string[]>) {
            const newList = [
                ...action.payload.map((item) => {
                    return {
                        id: uuidv4(),
                        placeholder: 'Insert a learning objective or outcome',
                        content: item,
                    }
                }),
            ]
            for (let i = 0; i < 4 - newList.length; i++) {
                newList.push({
                    id: uuidv4(),
                    placeholder: 'Insert a learning objective or outcome',
                    content: '',
                })
            }
            state.whatYouWillLearn = newList
        },
        updateOrderWhatYouWillLearn(state, action: PayloadAction<TInput[]>) {
            const newOrderList: TInput[] = []
            action.payload.forEach((item) => {
                state.whatYouWillLearn.forEach((el) => {
                    if (el.id === item.id) {
                        newOrderList.push(el)
                    }
                })
            })
            state.whatYouWillLearn = [...newOrderList]
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
        updateAllRequirements(state, action: PayloadAction<string[]>) {
            const newList = [
                ...action.payload.map((item) => {
                    return {
                        id: uuidv4(),
                        placeholder: 'Insert a requirement or prerequisite',
                        content: item,
                    }
                }),
            ]
            state.requirements = newList
        },
        updateOrderRequirements(state, action: PayloadAction<TInput[]>) {
            const newOrderList: TInput[] = []
            action.payload.forEach((item) => {
                state.requirements.forEach((el) => {
                    if (el.id === item.id) {
                        newOrderList.push(el)
                    }
                })
            })
            state.requirements = [...newOrderList]
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
        updateAllIntendedLearners(state, action: PayloadAction<string[]>) {
            const newList: TInput[] = []
            action.payload.forEach((item) => {
                newList.push({
                    id: uuidv4(),
                    placeholder: '',
                    content: item,
                })
            })
            state.intendedLearners = [...newList]
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
        updateWhatYouWillLearnState(state, action: PayloadAction<boolean>) {
            state.isUpdateWhatYouWillLearn = action.payload
        },
        updateRequirementsState(state, action: PayloadAction<boolean>) {
            state.isUpdateRequirements = action.payload
        },
        updateIntendedLearnersState(state, action: PayloadAction<boolean>) {
            state.isUpdateIntendedLearners = action.payload
        },
        resetIntendedLearnersStore() {
            return initialState
        },
    },
})

export const {
    addWhatYouWillLearn,
    updateWhatYouWillLearn,
    updateAllWhatYouWillLearn,
    updateOrderWhatYouWillLearn,
    deleteWhatYouWillLearn,
    addRequirements,
    updateRequirements,
    updateAllRequirements,
    updateOrderRequirements,
    deleteRequirements,
    addIntendedLearners,
    updateIntendedLearners,
    updateAllIntendedLearners,
    updateOrderIntendedLearners,
    deleteIntendedLearners,
    updateWhatYouWillLearnState,
    updateRequirementsState,
    updateIntendedLearnersState,
    resetIntendedLearnersStore,
} = courseIntendedLearnersSlice.actions

export default courseIntendedLearnersSlice.reducer
