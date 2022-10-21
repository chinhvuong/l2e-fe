import { apiPath } from '@/api/api-path'
import { callAPI } from '../axios-client'
import { AuthSubmit } from '../dto/auth.dto'

export interface AuthResponse {
    refreshToken: string
    accessToken: string
}

export const apiAuth = {
    login: (payload: AuthSubmit): Promise<AuthResponse> =>
        callAPI('post', apiPath.LOGIN, payload),
    refreshToken: (payload: { token: string }): Promise<AuthResponse> =>
        callAPI('post', apiPath.REFRESH, payload),
}
