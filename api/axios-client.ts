import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants/localStorage'
import { BACKEND_URL } from '@/constants/urls'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import Router from 'next/router'
import { toast } from 'react-toastify'
import { store } from '../store/index'
import { apiPath } from './api-path'
import { apiAuth } from './functions/api-auth'

let isAlreadyFetchingAccessToken = false
let refreshToken: any = null

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

    const res = axiosInstance[method](path, body, config)
    // switch (method) {
    //     case 'get':
    //         // in case GET method: body is config
    //         res = axiosInstance[method](path, body || config)
    //         break
    //     default:
    //         res = axiosInstance[method](path, body, config)
    // }

    return res
        .then((resp: any) => {
            isAlreadyFetchingAccessToken = false
            return resp
        })
        .catch(async (error: any) => {
            if (!error.config?.skipErrorHandle) {
                switch (error.response?.status) {
                    case 400: // Wrong url or params
                        toast.error(error.response.data.message, {
                            position: 'top-center',
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            progress: undefined,
                            theme: 'light',
                        })
                        break
                    case 500: // Server error
                        // Show toastr if error code global, likes: 500 Unknow Error
                        // Other: handled in vue component catch
                        toast.error('Server Error', {
                            position: 'top-center',
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            progress: undefined,
                            theme: 'light',
                        })
                        break
                    case 403: // Permission
                        break
                    case 401: // Signature verification failed | Token has been revoked
                        // check url # refresh token
                        // true: try to refresh access token. then call queue apis
                        // else: logout

                        if (path !== apiPath.REFRESH) {
                            if (!isAlreadyFetchingAccessToken) {
                                isAlreadyFetchingAccessToken = true
                                refreshToken = new Promise(
                                    async (resolve: any) => {
                                        // dispatch action call refresh token
                                        await store.dispatch(
                                            fetchRefreshToken(),
                                        )
                                        resolve(true)
                                    },
                                )
                            }
                            await refreshToken
                            return callAPI(method, path, body, config)
                        } else {
                            // handle logut
                            Router.push('/')
                            localStorage.clear()
                            toast.error('Phiên làm việc kết thúc!', {
                                position: 'top-center',
                                autoClose: 3000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                progress: undefined,
                                theme: 'light',
                            })
                            // redirect to login page
                            throw error.response.data
                        }
                    default:
                        throw error.response.data
                }
            }
            throw error.response.data
        })
}
