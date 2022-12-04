import { apiPath } from '@/api/api-path'
import { callAPI } from '../axios-client'
import { AuthResponse, AuthSubmit } from '../dto/auth.dto'

export const apiAuth = {
    login: (payload: AuthSubmit): Promise<AuthResponse> =>
        callAPI('post', apiPath.LOGIN, payload),
    refreshToken: (payload: { token: string }): Promise<AuthResponse> =>
        callAPI('post', apiPath.REFRESH, payload),
}
