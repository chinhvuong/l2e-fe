import { ACCESS_TOKEN } from '@/constants/localStorage'
import { BACKEND_URL } from '@/constants/urls'
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

const axiosInstance = axios.create({
    headers: {
        Accept: 'applications/json',
        'Content-Type': 'application/json',
    },
})

axiosInstance.interceptors.request.use(
    (config: AxiosRequestConfig = {}) => {
        // Do something before request is sent
        const token = localStorage.getItem(ACCESS_TOKEN) || null
        if (token && config.headers) {
            config.headers = { Authorization: `Bearer ${token}` }
        }
        return config
    },
    (error: any) => {
        // Do something with request error
        return Promise.reject(error)
    },
)

axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        return response.data
    },
    (error: AxiosError) => {
        throw error
    },
)

export const callAPI = async (
    method: 'get' | 'post' | 'put' | 'delete',
    path: string,
    body: object,
    config: object = {},
    baseURL: string | undefined = BACKEND_URL,
): Promise<AxiosResponse<any, any> | any> => {
    axiosInstance.defaults.baseURL = baseURL

    let res = null

    switch (method) {
        case 'get':
            // in case GET method: body is config
            res = axiosInstance[method](path, body || config)
            break
        default:
            res = axiosInstance[method](path, body, config)
    }

    return res
        .then((resp: any) => {
            return resp
        })
        .catch(async (error: any) => {
            switch (error.response?.status) {
                case 400: // Wrong url or params
                    break
                case 401: // Wrong url or params
                    // token.remove();
                    // window.location.href = '/login';

                    break
                case 403: // Wrong url or params
                    // token.remove();
                    // window.location.href = '/login';
                    break
                case 500: // Server error
                    break
                default:
                    throw error
            }
            throw error
        })
}
