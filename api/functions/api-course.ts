import { apiPath } from '@/api/api-path'
import { STORAGE_URL } from '@/constants/urls'
import { callAPI } from '../axios-client'
import {
    GetMintSignatureResponse,
    CoursePreview,
    CreateCourseRequest,
    CreateCourseResponse,
    GetAllCoursesResponse,
    GetAllMyCoursesResponse,
    GetCategoryResponse,
    GetCourseDetailResponse,
    UpdateCourseRequest,
    UpdateCourseResponse,
    GetAllMyEnrollCoursesResponse,
} from '../dto/course.dto'

export const apiCourse = {
    uploadSingleFile: (payload: FormData): Promise<string> =>
        callAPI(
            'post',
            apiPath.UPLOAD_SINGLE_FILE,
            payload,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Access-Control-Allow-Origin': '*',
                },
            },
            STORAGE_URL,
        ),
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
}
