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

export enum SortMethods {
    PRICE_ASC = 'price:1',
    RATING_ASC = 'ratingCount:1',
    STUDENT_ASC = 'students:1',
    PRICE_DESC = 'price:-1',
    RATING_DESC = 'ratingCount:-1',
    STUDENT_DESC = 'students:-1',
}
