import { apiPath } from '@/api/api-path'
import { STORAGE_URL } from '@/constants/urls'
import { callAPI } from '../axios-client'

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
}
