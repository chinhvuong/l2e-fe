import { useAppDispatch } from '@/hooks'
import { updateLoginState } from '@/store/user'
import useWeb3 from '@/wallet/hooks/useWeb3'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { callAPI } from '../../axios-client'
import { ApiMethods, MutationProps } from '../../types'
import Router from 'next/router'

const UseClientMutation = (
    method: ApiMethods,
    url: string,
    { onSuccess, onError }: MutationProps,
    options = {},
) => {
    const { disconnect } = useWeb3()
    const dispatch = useAppDispatch()
    const logOut = async () => {
        await disconnect()
        localStorage.clear()
        dispatch(updateLoginState(false))
        Router.push(`/`)
    }

    const makeRequest = (body: object) => {
        return new Promise((resolve, reject) => {
            callAPI(method, url, body, options).then(
                (data: any) => {
                    resolve(data)
                },
                (error: any) => {
                    if (error.response.status === 401) {
                        logOut()
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
        })
    }

    return useMutation((body: object) => makeRequest(body), {
        onError: (err: any) => {
            onError && onError(err)
        },
        onSuccess: (res: any) => {
            onSuccess(res)
        },
    })
}

export default UseClientMutation
