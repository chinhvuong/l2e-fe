export interface MutationProps {
    onError: (error: any) => void
    onSuccess: (response: any) => void
}

export enum ApiMethods {
    get = 'get',
    post = 'post',
    put = 'put',
    delete = 'delete',
}
