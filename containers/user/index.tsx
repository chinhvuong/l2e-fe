import { CoursePreview } from '@/api/dto/course.dto'
import UserProfileDetail from '@/components/common/user-profile-detail'
import CertificateCard from '@/components/core/certificate-card'
import Divider from '@/components/core/divider'
import HorizontalCourseCard from '@/components/core/horizontal-course-card'
import { useAppDispatch } from '@/hooks'
import { Certificate } from '@/store/certification/types'
import { updateGlobalLoadingState } from '@/store/user'
import { User } from '@/store/user/types'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
export interface StaticUserProps {
    user: User
    certificates: Certificate[]
    courseList: CoursePreview[]
}
export default function UserDetailPreviewContainer(props: StaticUserProps) {
    const router = useRouter()
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(updateGlobalLoadingState(router.isFallback))
    }, [router.isFallback])

    return (
        <div className="mx-60 under_2xl:mx-20">
            <div className="h-full pt-5 px-14 under_xl:px-0">
                <div className="flex mb-5 space-x-5">
                    <div className="bg-primary w-1.5"></div>
                    <div className="font-semibold text-[28px]">Profile</div>
                </div>
                {props.user && (
                    <UserProfileDetail data={props.user} showShortDescription />
                )}
            </div>
            <div className="h-full px-14 mt-10 mb-5 under_xl:px-0">
                <div className="flex mb-5 space-x-5">
                    <div className="bg-primary w-1.5"></div>
                    <div className="font-semibold text-[28px] -mx-4">
                        Courses
                    </div>
                </div>
                <div>
                    <div>
                        {props.courseList !== undefined &&
                            props.courseList.map(
                                (course: CoursePreview, index: number) => {
                                    return (
                                        <div
                                            key={course._id}
                                            className={`${
                                                index ===
                                                    props.courseList.length -
                                                        1 && 'pb-6'
                                            }`}
                                        >
                                            <HorizontalCourseCard
                                                key={course._id}
                                                data={course}
                                                clickMode={'view'}
                                            />
                                            {index !==
                                                props.courseList.length - 1 && (
                                                <Divider />
                                            )}
                                        </div>
                                    )
                                },
                            )}
                    </div>
                    {props.courseList && props.courseList.length === 0 && (
                        <div className="flex justify-center text-xl font-bold my-10">
                            No results found.
                        </div>
                    )}
                </div>
            </div>
            <div className="h-full px-14 under_xl:px-0">
                <div className="flex mb-5 space-x-5">
                    <div className="bg-primary w-1.5"></div>
                    <div className="font-semibold text-[28px] -mx-4">
                        Certificates
                    </div>
                </div>
                <div>
                    {props.certificates?.map((certification, index) => (
                        <div
                            key={index}
                            className={`${
                                index === props.certificates.length - 1 &&
                                'pb-6'
                            }`}
                        >
                            <CertificateCard
                                key={certification._id}
                                data={certification}
                            />
                            {index !== props.certificates.length - 1 && (
                                <Divider />
                            )}
                        </div>
                    ))}
                    {props.certificates?.length === 0 && (
                        <div className="flex justify-center text-xl font-bold my-10">
                            No results found.
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
