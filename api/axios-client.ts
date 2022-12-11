import { apiPath } from '@/api/api-path'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants/localStorage'
import { BACKEND_URL } from '@/constants/urls'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { store } from '../store/index'
import { apiAuth } from './functions/api-auth'

let isAlreadyFetchingAccessToken = false
const refreshToken: any = null

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

export const fetchRefreshToken = createAsyncThunk('auth/refresh', async () => {
    const response = await apiAuth.refreshToken({
        token: localStorage.getItem(REFRESH_TOKEN) || '',
    })
    return response
})

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
            isAlreadyFetchingAccessToken = false
            return resp
        })
        .catch(async (error: any) => {
            throw error
        })
}
