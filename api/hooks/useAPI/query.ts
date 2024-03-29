import { updateLoginState } from '@/store/user'
import { useAppDispatch } from '@/hooks'
import { useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import { ApiMethods } from '../../types'
import { callAPI } from '../../axios-client'
import { objectToQueryString } from '@/utils'
import { toast } from 'react-toastify'
import useWeb3 from '@/wallet/hooks/useWeb3'
import Router from 'next/router'

const UseClientQuery = (
    url: string,
    options = {},
    key?: string,
    settings?: {},
) => {
    const { disconnect } = useWeb3()
    const dispatch = useAppDispatch()
    const logOut = async () => {
        await disconnect()
        localStorage.clear()
        dispatch(updateLoginState(false))
        setTimeout(() => Router.push(`/`), 1000)
    }

    const makeRequest = useCallback(
        () =>
            new Promise<any>((resolve: any, reject: any) => {
                callAPI(ApiMethods.get, url, options).then(
                    (data: any) => {
                        resolve(data)
                    },
                    (error: any) => {
                        if (!error?.response?.status) {
                            toast.error('Something went wrong!', {
                                position: 'top-center',
                                autoClose: 1000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnFocusLoss: false,
                                pauseOnHover: false,
                                progress: undefined,
                                theme: 'light',
                                toastId: 'unknownError',
                            })
                        } else if (error.response.status === 401) {
                            logOut()
                            toast.error('Your token has been expired!', {
                                position: 'top-center',
                                autoClose: 1000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnFocusLoss: false,
                                pauseOnHover: false,
                                progress: undefined,
                                theme: 'light',
                                toastId: 'tokenExpired',
                            })
                        } else if (error.response.status === 403) {
                            toast.error(
                                'Your account does not have permission to access that resource.',
                                {
                                    position: 'top-center',
                                    autoClose: 1000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnFocusLoss: false,
                                    pauseOnHover: false,
                                    progress: undefined,
                                    theme: 'light',
                                    toastId: 'noPermission',
                                },
                            )
                            return
                        }
                        reject(error)
                    },
                )
            }),
        [url],
    )
    return useQuery(
        [key || `${url}?${objectToQueryString(options)}`],
        () => makeRequest(),
        settings,
    )
}

export default UseClientQuery
