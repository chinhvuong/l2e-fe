import { useCallback } from 'react'

import { useQuery } from '@tanstack/react-query'
import { ApiMethods } from '../../types'
import { callAPI } from '../../axios-client'
import { objectToQueryString } from '@/utils'
import { toast } from 'react-toastify'

const UseClientQuery = (
    url: string,
    options = {},
    key?: string,
    settings?: {},
) => {
    const makeRequest = useCallback(
        () =>
            new Promise<any>((resolve: any, reject: any) => {
                callAPI(ApiMethods.get, url, options).then(
                    (data: any) => {
                        resolve(data)
                    },
                    (error: any) => {
                        if (error.response.status === 401) {
                            console.log('Your token has been expired!')
                            toast.error('Your token has been expired!', {
                                position: 'top-center',
                                autoClose: 3000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                progress: undefined,
                                theme: 'light',
                            })
                        }
                        if (error.response.status === 403) {
                            console.log(
                                'Your account does not have permission to access that resource.',
                            )
                            toast.error(
                                'Your account does not have permission to access that resource.',
                                {
                                    position: 'top-center',
                                    autoClose: 3000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    progress: undefined,
                                    theme: 'light',
                                },
                            )
                            return
                        }
                        reject(error.response.data)
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
