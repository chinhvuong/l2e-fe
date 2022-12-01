import VerticalCourseCard from '@/components/core/vertical-course-card'
import { CoursePreview } from '@/api/dto/course.dto'
import Button from '@/components/core/button'
import { useEffect, useState } from 'react'
import { useCourse } from '@/api/hooks/useCourse'
import Loading from '@/components/core/animate/loading'
import { CourseDetail } from '@/store/course/types'
import VerticalCourseList from '@/components/common/vertical-course-list'
import HorizontalCourseCard from '@/components/core/horizontal-course-card'

export default function MyCoursesContainer() {
    const [allMyCourses, setAllMyCourses] = useState<CoursePreview[]>([])
    const mintCourse = () => {}

    const { useGetAllMyCourses } = useCourse()
    const { data } = useGetAllMyCourses({
        onError: () => {},
        onSuccess: (response) => {
            setAllMyCourses(response.data)
        },
    })

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
                                                !course.approved
                                                    ? ''
                                                    : 'hidden'
                                            }`}
                                        >
                                            <Button
                                                onClick={() => mintCourse()}
                                            >
                                                Mint course
                                            </Button>
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
