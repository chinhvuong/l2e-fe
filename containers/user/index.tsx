import { CoursePreview } from '@/api/dto/course.dto'
import UserProfileDetail from '@/components/common/user-profile-detail'
import CertificateCard from '@/components/core/certificate-card'
import Divider from '@/components/core/divider'
import HorizontalCourseCard from '@/components/core/horizontal-course-card'
import { Certificate } from '@/store/certification/types'
import { User } from '@/store/user/types'
export interface StaticUserProps {
    user: User
    certificates: Certificate[]
}
export default function UserDetailPreviewContainer(props: StaticUserProps) {
    return (
        <div className="mx-60 under_2xl:mx-20">
            <div className="h-full pt-5 px-14">
                <div className="flex mb-5 space-x-5">
                    <div className="bg-primary w-1.5"></div>
                    <div className="font-semibold text-[28px]">Profile</div>
                </div>
                {props.user && (
                    <UserProfileDetail data={props.user} showShortDescription />
                )}
            </div>
            <div className="h-full px-14 mt-10 mb-5">
                <div className="flex mb-5 space-x-5">
                    <div className="bg-primary w-1.5"></div>
                    <div className="font-semibold text-[28px] -mx-4">
                        Courses
                    </div>
                </div>
                <div>
                    <div>
                        {props.certificates !== undefined &&
                            props.certificates.map(
                                (certificate: Certificate, index: number) => {
                                    return (
                                        <div
                                            key={certificate._id}
                                            className={`${
                                                index ===
                                                    props.certificates.length -
                                                        1 && 'pb-6'
                                            }`}
                                        >
                                            <HorizontalCourseCard
                                                key={certificate.course._id}
                                                data={
                                                    certificate.course as CoursePreview
                                                }
                                                clickMode={'view'}
                                            />
                                            {index !==
                                                props.certificates.length -
                                                    1 && <Divider />}
                                        </div>
                                    )
                                },
                            )}
                    </div>
                    {props.certificates && props.certificates.length === 0 && (
                        <div className="flex justify-center text-xl font-bold my-10">
                            No results found.
                        </div>
                    )}
                </div>
            </div>
            <div className="h-full px-14">
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
