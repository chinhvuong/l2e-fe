import { RootState } from '..'

export const getCertifications = (state: RootState) => {
    return state.certificates.certifications
}
export const getCertificationDetail = (state: RootState) => {
    return state.certificates.certificationDetails
}
