import UseClientQuery from '../useAPI/query'
import UseClientMutation from '../useAPI/mutation'
import { ApiMethods, MutationProps } from '../../types'

export default {
    get: (url: string, options = {}, key?: string, settings?: {}) =>
        UseClientQuery(url, options, key, settings),
    post: (url: string, { onSuccess, onError }: MutationProps, options = {}) =>
        UseClientMutation(
            ApiMethods.post,
            url,
            { onSuccess, onError },
            options,
        ),
    put: (url: string, { onSuccess, onError }: MutationProps) =>
        UseClientMutation(ApiMethods.put, url, { onSuccess, onError }),
    delete: (url: string, { onSuccess, onError }: MutationProps) =>
        UseClientMutation(ApiMethods.delete, url, { onSuccess, onError }),
    getMutation: (url: string, { onSuccess, onError }: MutationProps) =>
        UseClientMutation(ApiMethods.get, url, { onSuccess, onError }),
}

export const useUpsertLessons = (
    url: string,
    sectionId: string,
    { onSuccess, onError }: MutationProps,
    options = {},
) => {
    UseClientMutation(
        ApiMethods.post,
        url + sectionId,
        { onSuccess, onError },
        options,
    )
}
