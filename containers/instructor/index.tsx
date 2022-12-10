import Button from '@/components/core/button'
import { useEffect, useState } from 'react'
import Router from 'next/router'
import Loading from '@/components/core/animate/loading'
import HorizontalCourseCard from '@/components/core/horizontal-course-card'
import axios from 'axios'
import { goerli } from 'wagmi/chains'
import { useAccount, useSigner } from 'wagmi'
import { CoursePreview, GetMintSignatureResponse } from '@/api/dto/course.dto'
import { useCourse } from '@/api/hooks/useCourse'
import { createCourse } from '@/hooks/coursedex'
import MyCourseCard from './my-course-card'

export default function InstructorContainer() {
    const [isLoading, setIsLoading] = useState(false)
    const [allMyCourses, setAllMyCourses] = useState<CoursePreview[]>([])
    const [requireinfo, setRequireinfo] = useState<GetMintSignatureResponse>()
    const [courseId, setCourseId] = useState<string>('')
    const { useGetAllMyCourses, useGetSignatureMint } = useCourse()
    const { refetch } = useGetSignatureMint(courseId, {
        onError: () => {},
        onSuccess: (response) => {
            setRequireinfo(response)
        },
    })
    const { data } = useGetAllMyCourses({
        onError: () => {},
        onSuccess: (response) => {
            setAllMyCourses(response.data)
            setIsLoading(false)
        },
    })
    // const { address, isConnected } = useAccount()
    const { data: signer } = useSigner({
        chainId: goerli.id,
    })
    const mintCourse = async (id: string) => {
        setCourseId(id)
    }

    useEffect(() => {
        ;(async () => {
            if (courseId) {
                refetch()
                if (requireinfo) {
                    setIsLoading(true)
                    setCourseId('')
                    await createCourse(signer!, requireinfo)
                    //   setIsLoading(false)
                }
            }
        })()
    }, [requireinfo, courseId])
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
                {isLoading ? (
                    <div className="flex justify-center items-center h-20">
                        <Loading />
                    </div>
                ) : (
                    <div className=" pt-4">
                        {allMyCourses.length <= 0 ? (
                            <div className="text-stone-400">
                                {`You don't have any courses yet!`}
                            </div>
                        ) : (
                            <div className="grid grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
                                {allMyCourses.map((course, index) => {
                                    return (
                                        <MyCourseCard
                                            key={index}
                                            course={course}
                                        />
                                    )
                                })}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
