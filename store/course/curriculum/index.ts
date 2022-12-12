import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
    CourseCurriculumState,
    CurriculumLecture,
    CurriculumSection,
    DeleteLecture,
} from './types'
import { v4 as uuidv4 } from 'uuid'
import { TInputUpdate } from '../types'

const initialState: CourseCurriculumState = {
    sections: [],
    lectures: [],
}

export const courseCurriculumSlice = createSlice({
    name: 'courseCurriculumSlice',
    initialState,
    reducers: {
        updateAllCurriculumSections(
            state,
            action: PayloadAction<CurriculumSection[]>,
        ) {
            const newList: CurriculumSection[] = []
            action.payload.forEach((item) => {
                newList.push({
                    _id: item._id,
                    courseId: item.courseId,
                    name: item.name,
                    description: item.description,
                })
            })
            state.sections = [...newList]
        },
        addCurriculumSection(state) {
            const sectionId = uuidv4()
            state.sections.push({
                _id: sectionId,
                courseId: state.sections[0].courseId,
                name: '',
                description: '',
            })
            state.lectures.push([
                {
                    _id: uuidv4(),
                    name: '',
                    description: '',
                    media: '',
                    mediaType: '',
                    quizzes: [],
                    sectionId: sectionId,
                    mode: '',
                },
            ])
        },
        updateCurriculumSectionName(
            state,
            action: PayloadAction<TInputUpdate>,
        ) {
            for (let i = 0; i < state.sections.length; i++) {
                if (state.sections[i]._id === action.payload.id) {
                    state.sections[i].name = action.payload.content
                    break
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
        addCurriculumLecture(state, action: PayloadAction<string>) {
            state.lectures.forEach((item) => {
                if (item[0].sectionId === action.payload) {
                    item.push({
                        _id: uuidv4(),
                        name: '',
                        description: '',
                        media: '',
                        mediaType: '',
                        quizzes: [],
                        sectionId: action.payload,
                        mode: '',
                    })
                }
            })
        },
        updateCurriculumLecture(
            state,
            action: PayloadAction<CurriculumLecture>,
        ) {
            console.log('updateCurriculumLecture', action.payload)
            state.lectures.forEach((item) => {
                if (item[0].sectionId === action.payload.sectionId) {
                    item.forEach((el) => {
                        if (el._id === action.payload._id) {
                            el.name = action.payload.name
                            el.description = action.payload.description
                            el.media = action.payload.media
                            el.mediaType = action.payload.mediaType
                            el.quizzes = action.payload.quizzes
                            el.sectionId = action.payload.sectionId
                            el.mode = action.payload.mode
                        }
                    })
                }
            })
        },
        // updateOrderCurriculumLecture(state, action: PayloadAction<string[]>) {
        //     const prevState = [...state.lectures]
        //     for (let i = 0; i < state.lectures.length; i++) {
        //         state.lectures[i] =
        //             prevState.find((item) => {
        //                 if (item._id === action.payload[i]) {
        //                     return item
        //                 }
        //             }) ?? prevState[i]
        //     }
        // },
        deleteCurriculumLecture(state, action: PayloadAction<DeleteLecture>) {
            const index = state.lectures.findIndex(
                (item) => item[0].sectionId === action.payload.sectionId,
            )
            state.lectures[index].splice(action.payload.index, 1)
        },
        updateAllCurriculumLectures(
            state,
            action: PayloadAction<CurriculumLecture[]>,
        ) {
            // call in loop to gradually update lectures for each section
            state.lectures.push(action.payload)
        },
    },
})

export const {
    updateAllCurriculumSections,
    addCurriculumSection,
    updateCurriculumSectionName,
    updateOrderCurriculumSection,
    deleteCurriculumSection,
    updateAllCurriculumLectures,
    addCurriculumLecture,
    updateCurriculumLecture,
    // updateOrderCurriculumLecture,
    deleteCurriculumLecture,
} = courseCurriculumSlice.actions

export default courseCurriculumSlice.reducer
