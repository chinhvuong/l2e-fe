import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Router from 'next/router'
import Button from '@/components/core/button'
import { useCreateCourseContext } from '@/containers/create-course/create-course-context'
import { useAppSelector } from '@/hooks'
import { getCanSaveCourseState } from '@/store/course/selectors'

export interface IHeaderProps {}

export default function Header() {
    const {
        courseDetail,
        courseSections,
        updateCourse,
        upsertSections,
        isLoading,
    } = useCreateCourseContext()

    const canSaveCourse = useAppSelector(getCanSaveCourseState)

    const goBack = () => {
        Router.push('/instructor/courses')
    }

    const handleUpdateCourseDetail = () => {
        updateCourse(courseDetail)
        upsertSections(
            courseSections.map((item) => {
                const el: any = { ...item }
                delete el._id
                return el
            }),
        )
    }

    return (
        <div className="flex items-center justify-between bg-black h-[65px] w-full fixed top-0 z-10 px-5">
            <div
                className="flex items-center space-x-3 cursor-pointer"
                onClick={() => goBack()}
            >
                <FontAwesomeIcon
                    icon={faChevronLeft}
                    className="text-xl bg-black text-white"
                />
                <div className="text-white">Back</div>
            </div>
            <Button
                isLoading={isLoading || !canSaveCourse}
                onClick={() => handleUpdateCourseDetail()}
            >
                <div className="font-semibold">Save</div>
            </Button>
        </div>
    )
}
