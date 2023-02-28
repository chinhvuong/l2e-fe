import { LearnerAPI } from '@/api/api-path'
import useAPI from '@/api/hooks/useAPI'
import { UseMutateFunction } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

interface ICourseDetailContext {
    isLoading: boolean
    data: any
}

export const CourseDetailContext = createContext<ICourseDetailContext>(
    {} as ICourseDetailContext,
)

export const CourseDetailProvider: React.FC<React.PropsWithChildren<{}>> = ({
    children,
}) => {
    const [courseId, setCourseId] = useState('')
    const [data, setData] = useState({})
    const router = useRouter()

    const { mutate: getCourseDetail, isLoading: isLoadingCourseDetail } =
        useAPI.getMutation(
            LearnerAPI.GET_COURSE_DETAIL + courseId + '?id=' + courseId,
            {
                onError: () => {},
                onSuccess: (response) => {
                    setData(response)
                },
            },
        )

    useEffect(() => {
        if (typeof router.query.slug === 'string') {
            setCourseId(router.query.slug)
            setTimeout(getCourseDetail, 1000)
        }
    }, [router.query.slug])

    const isLoading = useMemo(() => {
        return isLoadingCourseDetail
    }, [isLoadingCourseDetail])

    return (
        <CourseDetailContext.Provider
            value={{
                isLoading,
                data,
            }}
        >
            {children}
        </CourseDetailContext.Provider>
    )
}

export const useCourseDetailContext = () => {
    return useContext(CourseDetailContext) as ICourseDetailContext
}
