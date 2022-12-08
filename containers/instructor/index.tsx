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
        },
    })
    const { address, isConnected } = useAccount()
    const { data: signer } = useSigner({
        chainId: goerli.id,
    })
    const mintCourse = async (id: string) => {
        setCourseId(id)
    }
    const approve = async (id: string) => {
        await axios.post(
            'https://l2e-be-v1.herokuapp.com/course/manage/own-courses/send-approve-request',
            {
                id: id,
                notes: [''],
            },
        )
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
            <div className="flex justify-center mt-6">
                {allMyCourses.length === 0 ? (
                    <div className="flex justify-center items-center h-20">
                        <Loading />
                    </div>
                ) : (
                    <div className="flex justify-center">
                        <div className="space-y-8">
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
                                            className={`flex justify-center text-white pr-14 ${
                                                !course?.courseId &&
                                                course.approved &&
                                                !isLoading
                                                    ? ''
                                                    : 'hidden'
                                            }`}
                                        >
                                            <Button
                                                onClick={() =>
                                                    mintCourse(course._id)
                                                }
                                            >
                                                Mint course
                                            </Button>
                                        </div>
                                        <div
                                            className={`flex justify-center text-white pr-14 ${
                                                !course?.courseId &&
                                                !course.approved
                                                    ? ''
                                                    : 'hidden'
                                            }`}
                                        >
                                            <Button
                                                onClick={() =>
                                                    approve(course._id)
                                                }
                                            >
                                                Request Approve
                                            </Button>
                                        </div>
                                        <div
                                            className={`flex justify-center text-white ${
                                                !course?.courseId &&
                                                course.approved &&
                                                isLoading
                                                    ? ''
                                                    : 'hidden'
                                            }`}
                                        >
                                            <Loading></Loading>
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
