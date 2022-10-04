import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { JWT_KEY } from '@/constants/localStorage'

async function sendRequest(
    payload: AxiosRequestConfig,
    doesReturnHeader: boolean = false,
): Promise<AxiosResponse<any, any> | any> {
    try {
        payload.headers = payload.headers
            ? payload.headers
            : { Authorization: 'Bearer ' + accessToken() }

        if (doesReturnHeader) {
            const rest = await axiosInstance.request(payload)
            return rest
        }

        const response = await axiosInstance.request(payload)

        return Promise.resolve(response?.data)
    } catch (error: any) {
        return Promise.reject(error)
    }
}

export const axiosInstance = axios.create()

axiosInstance.interceptors.response.use(
    (response) => {
        return response
    },
    async (err: AxiosError) => {
        const { response } = err
        try {
            return response
        } catch (error) {
            return response
        }
    },
)

export function accessToken() {
    if (typeof localStorage === 'undefined') return undefined
    const token = localStorage.getItem(JWT_KEY)
    return token === null ? undefined : token
}

export function setAccessToken(value?: string) {
    if (value) {
        localStorage.setItem(JWT_KEY, value)
    } else {
        localStorage.removeItem(JWT_KEY)
    }

    return value
}

export default sendRequest
