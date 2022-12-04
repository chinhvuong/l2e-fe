import VerticalCourseCard from '@/components/core/vertical-course-card'
import { CoursePreview } from '@/api/dto/course.dto'
import { GetMintSignatureResponse } from '@/api/dto/course.dto'
import Button from '@/components/core/button'
import { useEffect, useState } from 'react'
import { useCourse } from '@/api/hooks/useCourse'
import Loading from '@/components/core/animate/loading'
import { CourseDetail } from '@/store/course/types'
import VerticalCourseList from '@/components/common/vertical-course-list'
import HorizontalCourseCard from '@/components/core/horizontal-course-card'
import Router, { useRouter } from 'next/router'
import { useAccount, useSigner } from 'wagmi'
import { createCourse } from '@/hooks/coursedex'
import { goerli } from 'wagmi/chains'
export default function MyCoursesContainer() {
    const [isLoading, setIsLoading] = useState(true)
    const [allMyCourses, setAllMyCourses] = useState<CoursePreview[]>([])
    const [requireinfo, setRequireinfo] = useState<GetMintSignatureResponse>()
    const [courseId, setCourseId] = useState<string>('')
    const { useGetAllMyCourses, useGetSignatureMint } = useCourse()
    const router = useRouter()
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
        },
    })
    const { address, isConnected } = useAccount()
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
                    setIsLoading(false)
                }
            }
        })()
    }, [requireinfo, courseId])

    return (
        <div className="bg-second text-white space-x-10 px-14 py-8">
            <div className="2xl:w-[805px] xl:w-[805px] lg:w-[635px] md:w-[485px] sm:w-[285px] mb-[10px]">
                <div className="font-semibold text-[30px]">All my courses</div>
            </div>
            <div className="flex justify-center mt-6">
                {allMyCourses.length === 0 ? (
                    <div className="flex justify-center items-center h-20">
                        <Loading />
                    </div>
                ) : (
                    <div className="flex justify-center">
                        <div className="space-y-5">
                            {allMyCourses.map((course) => {
                                return (
                                    <div
                                        key={course._id}
                                        className="flex items-center"
                                    >
                                        <HorizontalCourseCard
                                            key={course._id}
                                            data={course}
                                        />
                                        <div
                                            className={`flex justify-center text-white ${
                                                !course?.courseId &&
                                                course.approved && isLoading
                                                    ? ''
                                                    : 'hidden'
                                            }`}
                                        >
                                            {' '}
                                            {isLoading ? (
                                                <div className="flex justify-center items-center h-20">
                                                    <Loading />
                                                </div>
                                            ) : (
                                                <Button
                                                    onClick={() =>
                                                        mintCourse(course._id)
                                                    }
                                                >
                                                    Mint course
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
