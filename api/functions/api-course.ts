import { apiPath } from '@/api/api-path'
import { callAPI } from '../axios-client'
import {
    GetMintSignatureResponse,
    CreateCourseRequest,
    CreateCourseResponse,
    GetAllCoursesResponse,
    GetAllMyCoursesResponse,
    GetCategoryResponse,
    GetCourseDetailResponse,
    LessonRequestItem,
    SectionRequestItem,
    UpdateCourseRequest,
    UpdateCourseResponse,
    GetAllMyEnrollCoursesResponse,
    SectionResponseItem,
    LessonResponseItem,
} from '../dto/course.dto'

export const apiCourse = {
    uploadSingleFile: (payload: FormData): Promise<string> =>
        callAPI('post', apiPath.UPLOAD_SINGLE_FILE, payload, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Access-Control-Allow-Origin': '*',
            },
        }),
    createCourse: (
        payload: CreateCourseRequest,
    ): Promise<CreateCourseResponse> =>
        callAPI('post', apiPath.CREATE_COURSE, payload),
    updateCourse: (
        payload: UpdateCourseRequest,
    ): Promise<UpdateCourseResponse> =>
        callAPI('put', apiPath.UPDATE_COURSE + payload._id, payload),
    getMyCourseDetail: (courseId: string): Promise<GetCourseDetailResponse> =>
        callAPI(
            'get',
            apiPath.GET_MY_COURSE_DETAIL + courseId + '?id=' + courseId,
            {},
        ),
    getCourseDetail: (courseId: string): Promise<GetCourseDetailResponse> =>
        callAPI(
            'get',
            apiPath.GET_COURSE_DETAIL + courseId + '?id=' + courseId,
            {},
        ),
    checkEnroll: (courseId: string): Promise<{ enroll: boolean }> =>
        callAPI('get', apiPath.CHECK_ENROLL + courseId, {}),
    getAllCourses: (): Promise<GetAllCoursesResponse> =>
        callAPI('get', apiPath.GET_ALL_COURSES, {}),
    getAllMyCourse: (): Promise<GetAllMyCoursesResponse> =>
        callAPI('get', apiPath.GET_ALL_MY_COURSES, {}),
    getAllMyEnrollCourse: (): Promise<GetAllMyEnrollCoursesResponse> =>
        callAPI('get', apiPath.GET_ALL_MY_ENROLL_COURSES, {}),
    getCategory: (): Promise<GetCategoryResponse> =>
        callAPI('get', apiPath.GET_CATEGORY, {}),
    getMintSignature: (courseId: string): Promise<GetMintSignatureResponse> =>
        callAPI('get', apiPath.GET_MINT_SIGNATURE + '?id=' + courseId, {}),
    requestApprove: (data: {
        id: string
        notes: string[]
    }): Promise<{ success: boolean }> =>
        callAPI('post', apiPath.REQUEST_APPROVE, data),
    getSections: (courseId: string): Promise<SectionRequestItem[]> =>
        callAPI('get', apiPath.GET_SECTIONS + '?courseId=' + courseId, {}),
    upsertSections: (
        payload: SectionRequestItem[],
    ): Promise<SectionResponseItem[]> =>
        callAPI('post', apiPath.UPSERT_SECTIONS + payload[0].courseId, payload),
    upsertLessons: (
        payload: LessonRequestItem[],
    ): Promise<LessonResponseItem[]> =>
        callAPI('post', apiPath.UPSERT_LESSONS + payload[0].sectionId, payload),
}
