import CourseCard, { ICourseCardProps } from '@/components/core/course-card'
import * as React from 'react'

export interface ICourseListProps {
    data: ICourseCardProps[]
}

export default function CourseList(props: ICourseListProps) {
    return (
        <>
            {props.data.map((course) => {
                return (
                    <CourseCard
                        key={course.thumbnail}
                        thumbnail={course.thumbnail}
                        title={course.title}
                        authors={course.authors}
                        rating={course.rating}
                        students={course.students}
                        price={course.price}
                        isBestseller={course.isBestseller}
                        category={course.category}
                    />
                )
            })}
        </>
    )
}
