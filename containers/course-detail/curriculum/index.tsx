import { useCourseDetailContext } from '../course-detail-context'
import CourseContent from '../curriculum/course-content'

export interface ICurriculumProps {}

export default function Curriculum() {
    const { data } = useCourseDetailContext()

    if (!data || !data.sections) {
        return <></>
    }

    return <CourseContent sections={data.sections} />
}
