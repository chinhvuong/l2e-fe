import { CourseDetailPreview } from '@/api/dto/course.dto'
import { User } from '../user/types'

export interface Certificate {
    _id: string
    user: User
    courseId: number
    finalGrade: number
    graduation: string
    status: string
    createdAt: string
    updatedAt: string
    course: CourseDetailPreview
}

export interface CertificateState {
    certifications: Certificate[]
    certificationDetails: Certificate
}
