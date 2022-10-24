import { useAppDispatch } from 'hooks'
import { useMutation } from '@tanstack/react-query'
import { MutationProps } from '../types'
import { apiCourse } from '../functions/api.course'

export const useCourse = () => {
    const dispatch = useAppDispatch()

    const useUploadSingleFile = ({ onError, onSuccess }: MutationProps) => {
        return useMutation(
            (body: FormData) => apiCourse.uploadSingleFile(body),
            {
                onError: (error) => onError(error),
                onSuccess: async (response: string) => {
                    if (response) {
                        onSuccess(response)
                    }
                },
            },
        )
    }

    return {
        useUploadSingleFile,
    }
}
