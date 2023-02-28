import Button from '@/components/core/button'
import { useEffect, useState } from 'react'
import Router from 'next/router'
import { goerli } from 'wagmi/chains'
import { useSigner } from 'wagmi'
import {
    CoursePreview,
    GetCategoryResponse,
    GetMintSignatureResponse,
} from '@/api/dto/course.dto'
import { createCourse } from '@/hooks/coursedex'
import MyCourseCard from './my-course-card'
import useAPI from '@/api/hooks/useAPI'
import { InstructorAPI, UserAPI } from '@/api/api-path'
import LoadingScreen from '@/components/core/animate/loading-screen'
import { noop } from 'lodash'
import { Category } from '@/constants/interfaces'
import { CATEGORY, CATEGORY_NAME_LIST } from '@/constants/localStorage'

export default function InstructorContainer() {
    const [requireinfo, setRequireinfo] = useState<GetMintSignatureResponse>()
    const [courseId, setCourseId] = useState<string>('')
    const { mutate: getSignatureMint, isLoading: isLoadingGetSignatureMint } =
        useAPI.getMutation(
            InstructorAPI.GET_MINT_SIGNATURE + '?id=' + courseId,
            {
                onError: () => {},
                onSuccess: (response) => {
                    setRequireinfo(response)
                },
            },
        )

    const { mutate: getCategory, isLoading: isLoadingGetCategory } =
        useAPI.getMutation(UserAPI.GET_CATEGORY, {
            onError: noop,
            onSuccess: (response: GetCategoryResponse) => {
                const category = response.data.map(
                    (item: Category) => item.name,
                )
                localStorage.setItem(CATEGORY, JSON.stringify(response.data))
                localStorage.setItem(
                    CATEGORY_NAME_LIST,
                    JSON.stringify(category),
                )
            },
        })

    useEffect(() => {
        getCategory({})
    }, [])

    const { data: allMyCourses, isLoading: isLoadingAllMyCourses } = useAPI.get(
        InstructorAPI.GET_ALL_MY_COURSES,
        {},
        '',
        {
            refetchOnWindowFocus: false,
        },
    )

    const { data: signer, isLoading: isLoadingSigner } = useSigner({
        chainId: goerli.id,
    })

    useEffect(() => {
        ;(async () => {
            if (courseId) {
                getSignatureMint({})
                if (requireinfo) {
                    setCourseId('')
                    await createCourse(signer!, requireinfo)
                }
            }
        })()
    }, [requireinfo, courseId])

    const goToCreateCoursePage = () => {
        Router.push('/create-course')
    }

    return (
        <>
            <LoadingScreen
                isLoading={
                    isLoadingSigner ||
                    isLoadingAllMyCourses ||
                    isLoadingGetSignatureMint ||
                    isLoadingGetCategory
                }
            />
            <div className="py-8 h-full space-y-10">
                <div className="flex justify-between px-14">
                    <div className="font-semibold text-[30px]">My courses</div>
                    <div className="text-white">
                        <Button onClick={() => goToCreateCoursePage()}>
                            Create course
                        </Button>
                    </div>
                </div>
                {!isLoadingSigner && !isLoadingAllMyCourses && allMyCourses && (
                    <div className="grid grid-cols-3 lg:grid-cols-2 md:grid-cols-1 gap-4 px-14">
                        {allMyCourses.data.map(
                            (course: CoursePreview, index: number) => {
                                return (
                                    <MyCourseCard key={index} course={course} />
                                )
                            },
                        )}
                    </div>
                )}
            </div>
        </>
    )
}
