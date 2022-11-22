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

export const getAllIntendedLearners = (state: RootState) => {
    return state.intendedLearners
}

export const getWhatYouWillLearnState = (state: RootState) => {
    return state.intendedLearners.isUpdateWhatYouWillLearn
}

export const getRequirementsState = (state: RootState) => {
    return state.intendedLearners.isUpdateRequirements
}

export const getIntendedLearnersState = (state: RootState) => {
    return state.intendedLearners.isUpdateIntendedLearners
}
