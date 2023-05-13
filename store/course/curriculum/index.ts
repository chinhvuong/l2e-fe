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
                    mediaName: '',
                    mediaType: '',
                    quizzes: [],
                    sectionId: sectionId,
                    mode: '',
                    isLoading: false,
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
        updateOrderCurriculumSection(
            state,
            action: PayloadAction<CurriculumSection[]>,
        ) {
            state.sections = [...action.payload]
        },
        deleteCurriculumSection(state, action: PayloadAction<string>) {
            const sectionIndex = state.sections.findIndex(
                (item) => item._id === action.payload,
            )
            state.sections.splice(sectionIndex, 1)

            const lectureIndex = state.lectures.findIndex(
                (item) => item[0].sectionId === action.payload,
            )
            state.lectures.splice(lectureIndex, 1)
        },
        addCurriculumLecture(state, action: PayloadAction<string>) {
            state.lectures.forEach((item) => {
                if (item[0].sectionId === action.payload) {
                    item.push({
                        _id: uuidv4(),
                        name: '',
                        description: '',
                        media: '',
                        mediaName: '',
                        mediaType: '',
                        quizzes: [],
                        sectionId: action.payload,
                        mode: '',
                        isLoading: false,
                    })
                }
            })
        },
        updateCurriculumLecture(
            state,
            action: PayloadAction<CurriculumLecture>,
        ) {
            state.lectures.forEach((item) => {
                if (item[0].sectionId === action.payload.sectionId) {
                    item.forEach((el) => {
                        if (el._id === action.payload._id) {
                            el.name = action.payload.name
                            el.description = action.payload.description
                            el.media = action.payload.media
                            el.mediaName = action.payload.mediaName
                            el.mediaType = action.payload.mediaType
                            el.quizzes = action.payload.quizzes
                            el.sectionId = action.payload.sectionId
                            el.mode = action.payload.mode
                            el.isLoading = action.payload.isLoading
                        }
                    })
                }
            })
        },
        updateOrderCurriculumLecture(
            state,
            action: PayloadAction<CurriculumLecture[]>,
        ) {
            const index = state.lectures.findIndex(
                (item) => item[0].sectionId === action.payload[0].sectionId,
            )
            state.lectures[index] = [...action.payload]
        },
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
            if (action.payload.length === 0) {
                state.lectures.push([
                    {
                        _id: uuidv4(),
                        name: '',
                        description: '',
                        media: '',
                        mediaName: '',
                        mediaType: '',
                        quizzes: [],
                        sectionId:
                            state.sections[state.sections.length - 1]._id,
                        mode: '',
                        isLoading: false,
                    },
                ])
            } else {
                state.lectures.push(action.payload)
            }
        },
        resetCurriculumStore() {
            return initialState
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
    updateOrderCurriculumLecture,
    deleteCurriculumLecture,
    resetCurriculumStore,
} = courseCurriculumSlice.actions

export default courseCurriculumSlice.reducer
