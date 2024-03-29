import { RootState } from '@/store'
import { CurriculumLecture } from './types'
import { QuizSelectType } from '@/store/quiz/types'

export const getCurriculumSectionsForm = (state: RootState) => {
    return state.curriculum.sections
}

export const getCurriculumLecturesForm = (state: RootState) => {
    const lectures: CurriculumLecture[][] = []
    if (state.curriculum.lectures.length !== 0) {
        state.curriculum.sections.forEach((item) => {
            state.curriculum.lectures.forEach((el) => {
                if (item._id === el[0].sectionId) {
                    lectures.push(el)
                }
            })
        })
    }
    return lectures
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
        return (
            result ?? {
                _id: 'error',
                name: '',
                description: '',
                media: '',
                mediaName: '',
                mediaType: '',
                quizzes: [],
                sectionId: 'abc',
                mode: '',
                isLoading: false,
            }
        )
    }
export const getCurriculumLectureQuizzezDetail =
    (id: string, sectionId: string) => (state: RootState) => {
        const quizzezDetail: QuizSelectType[] = []
        let lectureDetail: CurriculumLecture = {} as CurriculumLecture
        state.curriculum.lectures.forEach((item) => {
            if (item[0].sectionId === sectionId) {
                lectureDetail = item.find(
                    (el) => el._id === id,
                ) as CurriculumLecture
            }
        })
        lectureDetail?.quizzes &&
            lectureDetail.quizzes.forEach((item) => {
                quizzezDetail.push({
                    label: item.name,
                    value: item._id,
                })
            })
        return quizzezDetail
    }

export const getUpdateFileState = (state: RootState) => {
    let isLoading = false
    state.curriculum.lectures.forEach((lecture) => {
        lecture.forEach((lesson) => {
            if (lesson.isLoading) {
                isLoading = true
            }
        })
    })
    return isLoading
}
