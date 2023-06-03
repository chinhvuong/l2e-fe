import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Certificate, CertificateState } from './types'

const initCertificate = {
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
        owner: '638610e6d308cc1b3f485e99',
        name: '',
        overview: '',
        description: '',
        price: 0,
        rating: 0,
        reviews: 0,
        students: 0,
        language: '',
        approved: false,
        requirements: [],
        goals: [],
        thumbnail: '',
        promotionalVideo: '',
        createdAt: '',
        updatedAt: '',
        include: {
            duration: '',
            resource: '',
            assignments: '',
            certificate: '',
            lifetimeAccess: '',
            device: '',
            articles: '',
            exercise: '',
        },
        courseId: 0,
        author: {
            _id: '',
            walletAddress: '',
            createdAt: '',
            updatedAt: '',
            name: null,
            title: null,
            bio: null,
            rating: 0,
            courses: [],
            avatar: null,
            nonce: 0,
        },
        category: {
            _id: '',
            name: '',
            slug: '',
            banner: '',
            thumbnail: '',
            color: '',
            __v: 0,
            createdAt: '',
            updatedAt: '',
        },
        ratingCount: 0,
        sections: [],
    },
    courseId: 3,
    finalGrade: 100,
    graduation: 'A',
    status: 'OFF_CHAIN',
    createdAt: '',
    updatedAt: '',
    image: '',
}

const initialState: CertificateState = {
    certifications: [initCertificate],
    certificationDetails: initCertificate,
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
