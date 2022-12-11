export type CourseCurriculumState = {
    sections: CurriculumSection[]
    lectures: CurriculumLecture[][]
}

export type CurriculumSection = {
    _id: string
    courseId: string
    name: string
    description: string
}

export type CurriculumLecture = {
    _id: string
    name: string
    description: string
    media: string
    mediaType: string
    quizzes: string[]
    sectionId: string
    mode: string
}

export type TInputUpdateLecture = {
    sectionId: string
    id: string
    content: string
}
