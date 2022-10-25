import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faStar,
    faUserGroup,
    faAward,
    faCirclePlay,
} from '@fortawesome/free-solid-svg-icons'
import { getInstructorInfo } from '@/store/user/selectors'
import ShowMore from '@/components/core/show-more'
import { useAppSelector } from '@/hooks'

export default function Instructor() {
    const data = useAppSelector(getInstructorInfo)

    const [showMore, setShowMore] = useState(false)

    const convertStringToHTML = () => {
        const element = document.getElementById('instructor-bio-content')
        let displayedData = data.bio.replaceAll(
            '<li>',
            '<li class="list-disc list-inside ml-2">',
        )
        displayedData = displayedData.replaceAll(
            '<ul>',
            '<ul class="space-y-3">',
        )
        if (element) {
            element.innerHTML = displayedData
        }
    }

    useEffect(() => {
        convertStringToHTML()
        setShowMore(true)
    }, [])

    return (
        <div id="instructor-section">
            <div className="font-semibold text-[26px]">Instructor</div>
            <div className="font-semibold text-[22px] mt-3 text-hyperlink underline cursor-pointer">
                {data.name}
            </div>
            <div className="text-description mt-1">{data.title}</div>
            <div className="flex items-center my-4">
                <img
                    src={`${data.avatar}`}
                    alt=""
                    className="rounded-[50%] w-[120px]"
                />
                <div className="flex flex-col space-y-2 ml-7 mr-4">
                    <div className="flex items-center space-x-2">
                        <FontAwesomeIcon icon={faStar} />
                        <div>{`${data.rating} Instructor Rating`}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <FontAwesomeIcon
                            icon={faUserGroup}
                            className="text-sm"
                        />
                        <div>??? 526,234 Reviews</div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <FontAwesomeIcon
                            icon={faAward}
                            className="text-xl mr-0.5"
                        />
                        <div>??? 1,634,289 Students</div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <FontAwesomeIcon
                            icon={faCirclePlay}
                            className="text-lg"
                        />
                        <div>{`${data.courses.length} Courses`}</div>
                    </div>
                </div>
            </div>
            <div id="instructor" className="space-y-3 overflow-hidden relative">
                <div
                    className="text-justify space-y-3"
                    id="instructor-bio-content"
                >
                    {data.bio}
                </div>
                {showMore && <ShowMore el="instructor" elHeightPreview={400} />}
            </div>
        </div>
    )
}
