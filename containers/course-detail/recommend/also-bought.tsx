import VerticalCourseList from '@/components/common/vertical-course-list'
import { dataCourses_preview_list } from '@/data/course-preview'
import { useCourseDetailContext } from '../course-detail-context'

export interface IAlsoBoughtProps {}

export default function AlsoBought() {
    const { isLoading } = useCourseDetailContext()

    if (isLoading) {
        return <></>
    }

    return (
        <div className="space-y-2">
            <div className="font-semibold text-[26px]">
                Students also bought
            </div>
            <VerticalCourseList data={dataCourses_preview_list} />
        </div>
    )
}
