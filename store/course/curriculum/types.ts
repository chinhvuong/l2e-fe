export type CourseCurriculumState = {
    sections: CurriculumSection[]
}

export type CurriculumSection = {
    _id: string
    courseId: number
    name: string
    description: string
}

export type CurriculumLecture = {
    _id: string
    name: string
    description: string
    media: string
    mediaType: string
    quizzes: number[]
    sectionId: number
    mode: string
}
