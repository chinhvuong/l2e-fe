import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Certificate, CertificateState } from './types'

const initialState: CertificateState = {
    certifications: [
        {
            _id: '64366f625ac318df990790fb',
            user: {
                _id: '638610e6d308cc1b3f485e99',
                walletAddress: '',
                createdAt: '',
                updatedAt: '',
                name: '',
                title: '',
                bio: '',
                rating: 0,
                courses: [],
                avatar: '',
                nonce: 0,
            },
            course: {
                _id: '638610e6d308cc1b3f485e99',
                name: 'nggenng',
                courseId: 3,
            },
            courseId: 3,
            finalGrade: 100,
            graduation: 'A',
            status: 'OFF_CHAIN',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ],
    certificationDetails: {
        _id: '64366f625ac318df990790fb',
        user: {
            _id: '638610e6d308cc1b3f485e99',
            walletAddress: '',
            createdAt: '',
            updatedAt: '',
            name: '',
            title: '',
            bio: '',
            rating: 0,
            courses: [],
            avatar: '',
            nonce: 0,
        },
        course: {
            _id: '638610e6d308cc1b3f485e99',
            name: 'nggenng',
            courseId: 3,
        },
        courseId: 3,
        finalGrade: 100,
        graduation: 'A',
        status: 'OFF_CHAIN',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
}

export const certificateSlice = createSlice({
    name: 'certificateSlice',
    initialState,
    reducers: {
        updateCertifications(state, action: PayloadAction<Certificate[]>) {
            state.certifications = action.payload
        },
        updateCertificationDetail(state, action: PayloadAction<Certificate>) {
            state.certificationDetails = action.payload
        },
    },
})

export const { updateCertificationDetail, updateCertifications } =
    certificateSlice.actions

export default certificateSlice.reducer
