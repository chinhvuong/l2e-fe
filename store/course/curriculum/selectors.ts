import { RootState } from '@/store'

export const getCurriculumSectionsForm = (state: RootState) => {
    return state.curriculum.sections
}

export const getCurriculumLecturesForm = (state: RootState) => {
    return state.curriculum.lectures
}

export const getCurriculumSectionDetail =
    (id: string) => (state: RootState) => {
        for (let i = 0; i < state.curriculum.sections.length; i++) {
            if (state.curriculum.sections[i]._id === id) {
                return state.curriculum.sections[i]
            }
        }
        return {
            _id: 'abc',
            courseId: '',
            name: '',
            description: '',
        }
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

export const getCurriculumLecturesOfSection =
    (sectionId: string) => (state: RootState) => {
        console.log(
            'getCurriculumLecturesOfSection',
            state.curriculum.lectures,
            sectionId,
        )
        state.curriculum.lectures.forEach((item) => {
            if (item[0].sectionId === sectionId) {
                return item
            }
        })
        return []
    }

export const getCurriculumLectureDetail =
    (id: string, sectionId: string) => (state: RootState) => {
        let result = undefined
        state.curriculum.lectures.forEach((item) => {
            if (item[0].sectionId === sectionId) {
                result = item.find((el) => el._id === id)
            }
        })
        console.log('result', result)
        return (
            result ?? {
                _id: 'error',
                name: '',
                description: '',
                media: '',
                mediaType: '',
                quizzes: [],
                sectionId: 'abc',
                mode: '',
            }
        )
    }
