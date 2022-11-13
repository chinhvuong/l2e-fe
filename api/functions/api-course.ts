import { apiPath } from '@/api/api-path'
import { STORAGE_URL } from '@/constants/urls'
import { callAPI } from '../axios-client'
import { CreateCourseRequest, GetCategoryResponse } from '../dto/course.dto'

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
    createCourse: (payload: CreateCourseRequest): Promise<string> =>
        callAPI('post', apiPath.CREATE_COURSE, payload),
    getCategory: (): Promise<GetCategoryResponse> =>
        callAPI('get', apiPath.GET_CATEGORY, {}),
}
