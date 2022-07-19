import sendRequest from '@/utils/resquest'
import { BACKEND_URL } from '@/contants/urls'
console.log('🚀 ~ file: user.ts ~ line 3 ~ BACKEND_URL', BACKEND_URL)

export const loginUser = (data: any) => {
    return sendRequest(
        {
            url: BACKEND_URL + 'login',
            method: 'POST',
            data,
        },
        true,
    )
}
