import { User } from '../user/types'

export interface Certificate {
    _id: string
    user: User
    courseId: number
    finalGrade: number
    graduation: string
    status: string
    createdAt: Date
    updatedAt: Date
    course: courseInfo
}

export interface courseInfo {
    _id: string
    name: string
    courseId: number
}

export interface CertificateState {
    certifications: Certificate[]
    certificationDetails: Certificate
}
