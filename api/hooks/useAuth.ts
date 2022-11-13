import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants/localStorage'
import { AuthResponse, AuthSubmit } from 'api/dto/auth.dto'
import { useAppDispatch } from 'hooks'
import { useMutation } from '@tanstack/react-query'
import { MutationProps } from '../types'
import { apiAuth } from '../functions/api-auth'

export const useAuth = () => {
    const dispatch = useAppDispatch()

    const saveToken = (data: AuthResponse) => {
        localStorage.setItem(ACCESS_TOKEN, data.accessToken)
        localStorage.setItem(REFRESH_TOKEN, data.refreshToken)
    }

    const useLogin = ({ onError, onSuccess }: MutationProps) => {
        return useMutation((body: AuthSubmit) => apiAuth.login(body), {
            onError: (error) => onError(error),
            onSuccess: async (response: AuthResponse) => {
                if (response) {
                    saveToken(response)
                    onSuccess(response)
                }
            },
        })
    }

    const useRefreshToken = ({ onError, onSuccess }: MutationProps) => {
        return useMutation(
            () =>
                apiAuth.refreshToken({
                    token: localStorage.getItem(REFRESH_TOKEN) || '',
                }),
            {
                onError: (error) => onError(error),
                onSuccess: async (response: AuthResponse) => {
                    if (response) {
                        saveToken(response)
                        onSuccess(response)
                    }
                },
            },
        )
    }

    return {
        useLogin,
        useRefreshToken,
    }
}
