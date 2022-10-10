import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faStar,
    faUserGroup,
    faAward,
    faCirclePlay,
    faChevronDown,
    faChevronUp,
} from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import { getInstructorInfo } from '@/state/user/selectors'

export default function Instructor() {
    const data = useSelector(getInstructorInfo)
    const [elHeight, setElHeight] = useState(0)
    const [showFullContent, setShowFullContent] = useState(false)

    useEffect(() => {
        setElHeight(
            document.getElementById(`instructor-${data._id}`)?.scrollHeight ??
                0,
        )
    }, [])

    return (
        <div className="flex justify-center">
            <div className="2xl:w-[1250px]">
                <div className="w-[820px] ml-[10px] space-y-5 mt-5">
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
                    <div
                        id={`instructor-${data._id}`}
                        className={`space-y-3 overflow-hidden relative ${
                            elHeight > 400 && !showFullContent && 'h-[400px]'
                        }`}
                    >
                        <div className="text-justify">{data.bio}</div>
                        <div
                            className={`flex flex-col justify-end z-10 top-1 left-0 w-full h-full ${
                                elHeight <= 400 && 'hidden'
                            } ${!showFullContent && 'absolute'} `}
                        >
                            <div
                                className={`h-full ${
                                    !showFullContent &&
                                    'bg-gradient-to-b from-transparent to-white'
                                }`}
                            ></div>
                            <div
                                className={`cursor-pointer ${
                                    !showFullContent && 'pb-5 bg-white'
                                }`}
                                onClick={() =>
                                    setShowFullContent(!showFullContent)
                                }
                            >
                                <span className="text-hyperlink font-bold mr-2">
                                    Show {!showFullContent ? 'more' : 'less'}
                                </span>
                                <FontAwesomeIcon
                                    icon={
                                        !showFullContent
                                            ? faChevronDown
                                            : faChevronUp
                                    }
                                    className="text-hyperlink"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
