import { dataCourses_detail } from '@/data/data-course-detail'
import { useEffect, useRef } from 'react'
import Curriculum from './curriculum'
import CourseInfo from './info'
import CourseLabel from './info/course-label'
import InstructorList from './instructor'
import Recommend from './recommend'
import Review from './review'

export default function CourseDetailContainer() {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(event: MouseEvent): void {
            if (ref.current && !ref.current.contains(event.target as Node)) {
            }
        }
        // Bind the event listener
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener('mousedown', handleClickOutside)
        }
    })

    return (
        <div>
            <CourseLabel info={dataCourses_detail.info} />
            <CourseInfo info={dataCourses_detail.info} />
            <Curriculum />
            <InstructorList />
            <Review />
            <Recommend />
        </div>
    )
}
