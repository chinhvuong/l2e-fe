import { useAppDispatch } from 'hooks'
import { useMutation, useQuery } from '@tanstack/react-query'
import { MutationProps } from '../types'
import { apiCourse } from '../functions/api-course'
import { CreateCourseRequest } from '../dto/course.dto'

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

    const useCreateCourse = ({ onError, onSuccess }: MutationProps) => {
        return useMutation(
            (body: CreateCourseRequest) => apiCourse.createCourse(body),
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

    const useGetCategory = () => {
        return useQuery(['category'], apiCourse.getCategory)
    }

    return {
        useUploadSingleFile,
        useCreateCourse,
        useGetCategory,
    }
}
