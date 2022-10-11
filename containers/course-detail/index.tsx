import Curriculum from './curriculum'
import CourseInfo from './info'
import CourseLabel from './info/course-label'
import Instructor from './instructor'
import Recommend from './recommend'
import Review from './review'

export default function CourseDetailContainer() {
    return (
        <div>
            <CourseLabel />
            <CourseInfo />
            <div className="flex justify-center">
                <div className="2xl:w-[1250px]">
                    <div className="2xl:w-[820px] xl:w-[800px] lg:w-[640px] md:w-[500px] sm:w-[390px] mx-[30px] space-y-7 mt-10">
                        <Curriculum />
                        <Instructor />
                        <Review />
                        <Recommend />
                    </div>
                </div>
            </div>
        </div>
    )
}
