import { RootState } from '@/store'

export const getCurriculumSectionsForm = (state: RootState) => {
    return state.curriculum.sections
}

export const getInputContentCurriculumSection =
    (id: string) => (state: RootState) => {
        for (let i = 0; i < state.curriculum.sections.length; i++) {
            if (state.curriculum.sections[i]._id === id) {
                return state.curriculum.sections[i].name
            }
        }
        return ''
    }

export const getCurriculumLecturesForm = (state: RootState) => {
    return state.curriculum.lectures
}

export const getInputContentCurriculumLecture =
    (id: string) => (state: RootState) => {
        for (let i = 0; i < state.curriculum.lectures.length; i++) {
            if (state.curriculum.lectures[i]._id === id) {
                return state.curriculum.lectures[i].name
            }
        }
        return ''
    }
