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
    GetAllCoursesResponse,
    GetAllMyCoursesResponse,
    GetAllMyEnrollCoursesResponse,
    SectionRequestItem,
    TSection,
    GetAllCourseSectionsResponse,
    TLesson,
    LessonRequestItem,
    SectionResponseItem,
    LessonResponseItem,
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

    const useGetAllMyEnrollCourses = ({
        onError,
        onSuccess,
    }: MutationProps) => {
        return useQuery(
            ['all-my-enroll-courses'],
            apiCourse.getAllMyEnrollCourse,
            {
                refetchOnWindowFocus: false,
                onError: (error) => onError(error),
                onSuccess: async (response: GetAllMyEnrollCoursesResponse) => {
                    if (response) {
                        onSuccess(response)
                    }
                },
            },
        )
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
    const useGetSignatureMint = (
        courseId: string,
        { onError, onSuccess }: MutationProps,
    ) => {
        return useQuery(
            ['signature-mint'],
            () => apiCourse.getMintSignature(courseId),
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
    const useGetSections = (
        courseId: string,
        { onError, onSuccess }: MutationProps,
    ) => {
        return useQuery(
            ['course-sections'],
            () => apiCourse.getSections(courseId),
            {
                refetchOnWindowFocus: false,
                enabled: false,
                onError: (error) => onError(error),
                onSuccess: async (response: GetAllCourseSectionsResponse) => {
                    if (response) {
                        onSuccess(response)
                    }
                },
            },
        )
    }

    const useUpsertSections = ({ onError, onSuccess }: MutationProps) => {
        return useMutation(
            (body: SectionRequestItem[]) => apiCourse.upsertSections(body),
            {
                onError: (error) => onError(error),
                onSuccess: async (response: SectionResponseItem[]) => {
                    if (response) {
                        onSuccess(response)
                    }
                },
            },
        )
    }

    const useUpsertLessons = ({ onError, onSuccess }: MutationProps) => {
        return useMutation(
            (body: LessonRequestItem[]) => apiCourse.upsertLessons(body),
            {
                onError: (error) => onError(error),
                onSuccess: async (response: LessonResponseItem[]) => {
                    if (response) {
                        onSuccess(response)
                    }
                },
            },
        )
    }
    return {
        useGetSignatureMint,
        useUploadSingleFile,
        useCreateCourse,
        useUpdateCourse,
        useGetAllCourses,
        useGetAllMyCourses,
        useGetAllMyEnrollCourses,
        useGetMyCourseDetail,
        useGetCourseDetail,
        useGetCategory,
        useGetSections,
        useUpsertSections,
        useUpsertLessons,
    }
}
