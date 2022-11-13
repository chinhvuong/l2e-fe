import { RootState } from '..'

export const getInstructorInfo = (state: RootState) => {
    return state.user.user
}
