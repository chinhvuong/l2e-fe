import { CoursePreview } from '@/api/dto/course.dto'
import { useCourse } from '@/api/hooks/useCourse'
import Loading from '@/components/core/animate/loading'
import HorizontalCourseCard from '@/components/core/horizontal-course-card'

export default function LearnerContainer() {
    const { useGetAllMyEnrollCourses } = useCourse()
    const { data } = useGetAllMyEnrollCourses({
        onError: () => {},
        onSuccess: () => {},
    })

    return (
        <div className="space-x-10 px-14 py-8 h-full">
            <div className="2xl:w-[805px] xl:w-[805px] lg:w-[635px] md:w-[485px] sm:w-[285px] mb-[10px]">
                <div className="font-semibold text-[30px]">My learning</div>
            </div>
            <div className="space-y-5">
                {data?.data === undefined ? (
                    <div className="flex justify-center items-center h-20">
                        <Loading />
                    </div>
                ) : (
                    data.data.map((course) => {
                        return (
                            <HorizontalCourseCard
                                key={course._id}
                                data={course}
                            />
                        )
                    })
                )}
            </div>
        </div>
    )
}
