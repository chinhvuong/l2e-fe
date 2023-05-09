import { CoursePreview } from '@/api/dto/course.dto'
import Divider from '@/components/core/divider'
import HorizontalCourseCard from '@/components/core/horizontal-course-card'
import { Certificate } from '@/store/certification/types'

export interface StaticCertificateProps {
    certificates: Certificate[]
}

export default function StaticLearnerCoursesContainer(
    props: StaticCertificateProps,
) {
    return (
        <>
            <div className="h-full mt-9 px-[3.5rem]">
                <div className="flex justify-between px-4">
                    <div className="font-semibold text-[30px]">Courses</div>
                </div>
                <div className="flex under_xl:block space-x-5 under_xl:space-x-0 px-4"></div>
                <div className="space-x-10">
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
        </>
    )
}
