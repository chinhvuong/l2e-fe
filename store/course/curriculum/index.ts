import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CourseCurriculumState } from './types'
import { v4 as uuidv4 } from 'uuid'
import { TInputUpdate } from '../types'

const initialState: CourseCurriculumState = {
    sections: [
        {
            _id: uuidv4(),
            courseId: 1,
            name: '',
            description: '',
        },
    ],
    lectures: [
        {
            _id: uuidv4(),
            name: '',
            description: '',
            media: '',
            mediaType: '',
            quizzes: [],
            sectionId: 1,
            mode: '',
        },
    ],
}

export const courseCurriculumSlice = createSlice({
    name: 'courseCurriculumSlice',
    initialState,
    reducers: {
        addCurriculumSection(state) {
            state.sections.push({
                _id: uuidv4(),
                courseId: 2,
                name: '',
                description: '',
            })
        },
        updateCurriculumSectionName(
            state,
            action: PayloadAction<TInputUpdate>,
        ) {
            for (let i = 0; i < state.sections.length; i++) {
                if (state.sections[i]._id === action.payload.id) {
                    state.sections[i].name = action.payload.content
                }
            }
        },
        updateOrderCurriculumSection(state, action: PayloadAction<string[]>) {
            const prevState = [...state.sections]
            for (let i = 0; i < state.sections.length; i++) {
                state.sections[i] =
                    prevState.find((item) => {
                        if (item._id === action.payload[i]) {
                            return item
                        }
                    }) ?? prevState[i]
            }
        },
        deleteCurriculumSection(state, action: PayloadAction<number>) {
            state.sections.splice(action.payload, 1)
        },
        addCurriculumLecture(state) {
            state.lectures.push({
                _id: uuidv4(),
                name: '',
                description: '',
                media: '',
                mediaType: '',
                quizzes: [],
                sectionId: 1,
                mode: '',
            })
        },
        updateCurriculumLectureName(
            state,
            action: PayloadAction<TInputUpdate>,
        ) {
            for (let i = 0; i < state.lectures.length; i++) {
                if (state.lectures[i]._id === action.payload.id) {
                    state.lectures[i].name = action.payload.content
                }
            }
        },
        updateOrderCurriculumLecture(state, action: PayloadAction<string[]>) {
            const prevState = [...state.lectures]
            for (let i = 0; i < state.lectures.length; i++) {
                state.lectures[i] =
                    prevState.find((item) => {
                        if (item._id === action.payload[i]) {
                            return item
                        }
                    }) ?? prevState[i]
            }
        },
        deleteCurriculumLecture(state, action: PayloadAction<number>) {
            state.lectures.splice(action.payload, 1)
        },
    },
})

export const {
    addCurriculumSection,
    updateCurriculumSectionName,
    updateOrderCurriculumSection,
    deleteCurriculumSection,
    addCurriculumLecture,
    updateCurriculumLectureName,
    updateOrderCurriculumLecture,
    deleteCurriculumLecture,
} = courseCurriculumSlice.actions

export default courseCurriculumSlice.reducer