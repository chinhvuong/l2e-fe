import CourseDetailContent from './course-detail-content'
import { CourseDetailProvider } from './course-detail-context'

export default function CourseDetailContainer() {
    return (
        <CourseDetailProvider>
            <CourseDetailContent />
        </CourseDetailProvider>
    )
}
