export interface QuestionDetailType {
    _id: string
    question: string
    choices: string[]
    correctAnswer: number
    courseId: string
    medias: string[]
}

export interface QuestionInPlayQuiz {
    _id: string
    question: string
    choices: string[]
    correctAnswer?: number
}

export interface PlayQuizRes {
    expiredAt: string
    gameId: string
    questions: QuestionInPlayQuiz[]
}
