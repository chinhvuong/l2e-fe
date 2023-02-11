import Button from '@/components/core/button'
import { useEffect, useState } from 'react'
import Router from 'next/router'
import Loading from '@/components/core/animate/loading'
import { goerli } from 'wagmi/chains'
import { useSigner } from 'wagmi'
import { CoursePreview, GetMintSignatureResponse } from '@/api/dto/course.dto'
import { createCourse } from '@/hooks/coursedex'
import MyCourseCard from './my-course-card'
import useAPI from '@/api/hooks/useAPI'
import { InstructorAPI } from '@/api/api-path'
import useLoadingScreen from '@/hooks/useLoadingScreen'

export default function InstructorContainer() {
    const [isLoading, setIsLoading] = useState(false)
    const [requireinfo, setRequireinfo] = useState<GetMintSignatureResponse>()
    const [courseId, setCourseId] = useState<string>('')
    const { mutate: getSignatureMint } = useAPI.getMutation(
        InstructorAPI.GET_MINT_SIGNATURE + '?id=' + courseId,
        {
            onError: () => {},
            onSuccess: (response) => {
                setRequireinfo(response)
            },
        },
    )

    const { data: allMyCourses } = useAPI.get(
        InstructorAPI.GET_ALL_MY_COURSES,
        {},
        '',
        {
            refetchOnWindowFocus: false,
        },
    )

    const { data: signer } = useSigner({
        chainId: goerli.id,
    })

    useEffect(() => {
        ;(async () => {
            if (courseId) {
                getSignatureMint({})
                if (requireinfo) {
                    setIsLoading(true)
                    setCourseId('')
                    await createCourse(signer!, requireinfo)
                }
            }
        })()
    }, [requireinfo, courseId])

    useLoadingScreen(isLoading)

    const goToCreateCoursePage = () => {
        Router.push('/create-course')
    }

    return (
        <div className="space-x-10 py-8 h-full">
            <div className="flex justify-between px-14">
                <div className="font-semibold text-[30px]">My courses</div>
                <div className="text-white">
                    <Button onClick={() => goToCreateCoursePage()}>
                        Create course
                    </Button>
                </div>
            </div>
            <div className="">
                {!isLoading && (
                    <div className=" pt-4">
                        {allMyCourses.length <= 0 ? (
                            <div className="text-stone-400">
                                {`You don't have any courses yet!`}
                            </div>
                        ) : (
                            <div className="grid grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
                                {allMyCourses.map(
                                    (course: CoursePreview, index: number) => {
                                        return (
                                            <MyCourseCard
                                                key={index}
                                                course={course}
                                            />
                                        )
                                    },
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
