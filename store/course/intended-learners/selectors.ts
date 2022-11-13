import { RootState } from '@/store'

export const getWhatYouWillLearnForm = (state: RootState) => {
    return state.intendedLearners.whatYouWillLearn
}

export const getRequirementsForm = (state: RootState) => {
    return state.intendedLearners.requirements
}

export const getIntendedLearnersForm = (state: RootState) => {
    return state.intendedLearners.intendedLearners
}
