import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faClapperboard,
    faRectangleList,
} from '@fortawesome/free-solid-svg-icons'
export interface ICourseTypeProps {}

export default function CourseType() {
    const [courseType, setCourseType] = useState('course')

    return (
        <div className="flex flex-col items-center">
            <div className="text-3xl my-16 font-bold">
                {`First, let's find out what type of course you're making.`}
            </div>
            <div className="flex space-x-7">
                <div
                    className={`flex flex-col items-center w-[250px] h-[270px] text-center pt-10 px-4 hover:border-primary rounded-[25px] cursor-pointer ${
                        courseType === 'course'
                            ? 'bg-primary text-white'
                            : 'border-2'
                    }`}
                    onClick={() => setCourseType('course')}
                >
                    <FontAwesomeIcon
                        icon={faClapperboard}
                        className="text-2xl"
                    />
                    <div className="font-bold mt-5 mb-2">Course</div>
                    <div>
                        Create rich learning experiences with the help of video
                        lectures, quizzes, coding exercises, etc.
                    </div>
                </div>
                <div
                    className={`flex flex-col items-center w-[250px] h-[270px] text-center pt-10 px-4 hover:border-primary rounded-[25px] cursor-pointer ${
                        courseType === 'practice-test'
                            ? 'bg-primary text-white'
                            : 'border-2'
                    }`}
                    onClick={() => setCourseType('practice-test')}
                >
                    <FontAwesomeIcon
                        icon={faRectangleList}
                        className="text-2xl"
                    />
                    <div className="font-bold mt-5 mb-2">Practice Test</div>
                    <div>
                        Help students prepare for certification exams by
                        providing practice questions.
                    </div>
                </div>
            </div>
        </div>
    )
}
