import { apiPath } from '@/api/api-path'
import { STORAGE_URL } from '@/constants/urls'
import { callAPI } from '../axios-client'
import {
    CreateCourseRequest,
    CreateCourseResponse,
    GetCategoryResponse,
    UpdateCourseRequest,
    UpdateCourseResponse,
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
    getCategory: (): Promise<GetCategoryResponse> =>
        callAPI('get', apiPath.GET_CATEGORY, {}),
}
