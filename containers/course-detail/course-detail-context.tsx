import { LearnerAPI } from '@/api/api-path'
import useAPI from '@/api/hooks/useAPI'
import { dataUser } from '@/data/users'
import { User } from '@/store/user/types'
import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

interface ICourseDetailContext {
    isLoading: boolean
    data: any
    instructor: any
}

export const CourseDetailContext = createContext<ICourseDetailContext>(
    {} as ICourseDetailContext,
)

export const CourseDetailProvider: React.FC<React.PropsWithChildren<{}>> = ({
    children,
}) => {
    const [courseId, setCourseId] = useState('')
    const [data, setData] = useState(undefined)
    const [instructor, setInstructor] = useState({})
    const router = useRouter()

    const { mutate: getCourseDetail, isLoading: isLoadingCourseDetail } =
        useAPI.getMutation(
            LearnerAPI.GET_COURSE_DETAIL + courseId + '?id=' + courseId,
            {
                onError: () => {},
                onSuccess: (response) => {
                    setData(response)
                    setInstructor(dataUser)
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
                instructor,
            }}
        >
            {children}
        </CourseDetailContext.Provider>
    )
}

export const useCourseDetailContext = () => {
    return useContext(CourseDetailContext) as ICourseDetailContext
}
