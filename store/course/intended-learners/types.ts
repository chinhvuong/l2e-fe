export type TInput = {
    id: string
    placeholder: string
    content: string
}

export type CourseIntendedLearnersState = {
    whatYouWillLearn: TInput[]
    requirements: TInput[]
    intendedLearners: TInput[]
    isUpdateWhatYouWillLearn: boolean
    isUpdateRequirements: boolean
    isUpdateIntendedLearners: boolean
}
