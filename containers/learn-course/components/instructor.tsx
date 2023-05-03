import ShowMore from '@/components/core/show-more'
import { dataUser } from '@/data/users'
import { faAward, faStar, faUserGroup } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import parse from 'html-react-parser'
import { useEffect, useState } from 'react'
import { useLearningCourseContext } from '../learning-course-context'

export interface ILearningInstructorDetailProps {}

export default function LearningInstructorDetail() {
    const { courseDetail } = useLearningCourseContext()

    const [showMore, setShowMore] = useState(false)
    useEffect(() => {
        setShowMore(true)
    }, [courseDetail])

    const getUIContent = (content: string) => {
        let formattedData = content.replace(
            /'<li>'/g,
            '<li class="list-disc list-inside ml-2">',
        )
        formattedData = formattedData.replace(
            /'<ul>'/g,
            '<ul class="space-y-3">',
        )

        return (
            <div className="text-justify space-y-3">{parse(formattedData)}</div>
        )
    }
    return (
        <div id="instructor-section">
            <div className="font-semibold text-[22px] mt-3 text-hyperlink underline underline-offset-4 cursor-pointer">
                {dataUser.name}
            </div>
            <div className="text-description mt-1">{dataUser.title}</div>
            <div className="flex items-center my-4">
                <img
                    src={`${dataUser.avatar}`}
                    alt=""
                    className="rounded-[50%] w-[120px]"
                />
                <div className="flex flex-col space-y-2 ml-7 mr-4">
                    <div className="flex items-center space-x-2">
                        <FontAwesomeIcon icon={faStar} />
                        <div>{`${dataUser.rating} Instructor Rating`}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <FontAwesomeIcon
                            icon={faUserGroup}
                            className="text-sm"
                        />
                        <div>526,234 Reviews</div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <FontAwesomeIcon
                            icon={faAward}
                            className="text-xl mr-0.5"
                        />
                        <div>1,634,289 Students</div>
                    </div>
                    {/* {courseDetail.courses && (
                        <div className="flex items-center space-x-2">
                            <FontAwesomeIcon
                                icon={faCirclePlay}
                                className="text-lg"
                            />
                            <div>{`${courseDetail.courses.length} Courses`}</div>
                        </div>
                    )} */}
                </div>
            </div>
            <div id="instructor" className="space-y-3 overflow-hidden relative">
                <div className="text-justify space-y-3">
                    {dataUser.bio && getUIContent(dataUser.bio)}
                </div>
                {showMore && <ShowMore el="instructor" elHeightPreview={400} />}
            </div>
        </div>
    )
}
