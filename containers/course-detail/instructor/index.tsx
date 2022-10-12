import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faStar,
    faUserGroup,
    faAward,
    faCirclePlay,
} from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import { getInstructorInfo } from '@/store/user/selectors'
import ShowMore from '@/components/core/show-more'

export default function Instructor() {
    const data = useSelector(getInstructorInfo)

    return (
        <div>
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
                <div className="flex flex-col items-center space-y-2 ml-7 mr-4">
                    <div>
                        <FontAwesomeIcon icon={faStar} />
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faUserGroup} />
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faAward} />
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faCirclePlay} />
                    </div>
                </div>
                <div className="space-y-2">
                    <div>{`${data.rating} Instructor Rating`}</div>
                    <div>??? 526,234 Reviews</div>
                    <div>??? 1,634,289 Students</div>
                    <div>{`${data.courses.length} Courses`}</div>
                </div>
            </div>
            <div id="instructor" className="space-y-3 overflow-hidden relative">
                <div className="text-justify">{data.bio}</div>
                <ShowMore el="instructor" elHeightPreview={400} />
            </div>
        </div>
    )
}
