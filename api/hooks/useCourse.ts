import { useMutation, useQuery } from '@tanstack/react-query'
import { MutationProps } from '../types'
import { apiCourse } from '../functions/api-course'
import {
    CreateCourseRequest,
    CreateCourseResponse,
    UpdateCourseRequest,
    UpdateCourseResponse,
    GetCategoryResponse,
    GetCourseDetailResponse,
    CoursePreview,
    GetAllCoursesResponse,
    GetAllMyCoursesResponse,
} from '../dto/course.dto'

export const useCourse = () => {
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
                onSuccess: async (response: CreateCourseResponse) => {
                    if (response) {
                        onSuccess(response)
                    }
                },
            },
        )
    }

    const useUpdateCourse = ({ onError, onSuccess }: MutationProps) => {
        return useMutation(
            (body: UpdateCourseRequest) => apiCourse.updateCourse(body),
            {
                onError: (error) => onError(error),
                onSuccess: async (response: UpdateCourseResponse) => {
                    if (response) {
                        onSuccess(response)
                    }
                },
            },
        )
    }

    const useGetAllCourses = ({ onError, onSuccess }: MutationProps) => {
        return useQuery(['all-courses'], apiCourse.getAllCourses, {
            refetchOnWindowFocus: false,
            enabled: false,
            onError: (error) => onError(error),
            onSuccess: async (response: GetAllCoursesResponse) => {
                if (response) {
                    onSuccess(response)
                }
            },
        })
    }

    const useGetAllMyCourses = ({ onError, onSuccess }: MutationProps) => {
        return useQuery(['all-my-courses'], apiCourse.getAllMyCourse, {
            refetchOnWindowFocus: false,
            onError: (error) => onError(error),
            onSuccess: async (response: GetAllMyCoursesResponse) => {
                if (response) {
                    onSuccess(response)
                }
            },
        })
    }

    const useGetMyCourseDetail = (
        courseId: string,
        { onError, onSuccess }: MutationProps,
    ) => {
        return useQuery(
            ['course-detail'],
            () => apiCourse.getMyCourseDetail(courseId),
            {
                refetchOnWindowFocus: false,
                enabled: false,
                onError: (error) => onError(error),
                onSuccess: async (response: GetCourseDetailResponse) => {
                    if (response) {
                        onSuccess(response)
                    }
                },
            },
        )
    }

    const useGetCourseDetail = (
        courseId: string,
        { onError, onSuccess }: MutationProps,
    ) => {
        return useQuery(
            ['course-detail'],
            () => apiCourse.getCourseDetail(courseId),
            {
                refetchOnWindowFocus: false,
                enabled: false,
                onError: (error) => onError(error),
                onSuccess: async (response: GetCourseDetailResponse) => {
                    if (response) {
                        onSuccess(response)
                    }
                },
            },
        )
    }

    const useGetCategory = ({ onError, onSuccess }: MutationProps) => {
        return useQuery(['category'], apiCourse.getCategory, {
            refetchOnWindowFocus: false,
            onError: (error) => onError(error),
            onSuccess: async (response: GetCategoryResponse) => {
                if (response) {
                    onSuccess(response)
                }
            },
        })
    }

    return {
        useUploadSingleFile,
        useCreateCourse,
        useUpdateCourse,
        useGetAllCourses,
        useGetAllMyCourses,
        useGetMyCourseDetail,
        useGetCourseDetail,
        useGetCategory,
    }
}
