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
export interface IInstructorProps {
    data: number
}

export default function Instructor(props: IInstructorProps) {
    const [elHeight, setElHeight] = useState(0)
    const [showFullContent, setShowFullContent] = useState(false)

    useEffect(() => {
        setElHeight(
            document.getElementById(`instructor-${props.data}`)?.scrollHeight ??
                0,
        )
    }, [])

    return (
        <div>
            <div className="font-semibold text-[22px] mt-3 text-hyperlink underline cursor-pointer">
                Dr. Angela Yu
            </div>
            <div className="text-description mt-1">
                Developer and Lead Instructor
            </div>
            <div className="flex items-center my-4">
                <img
                    src="/images/avatar.jpg"
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
                    <div>4.7 Instructor Rating</div>
                    <div>526,234 Reviews</div>
                    <div>1,634,289 Students</div>
                    <div>9 Courses</div>
                </div>
            </div>
            <div
                id={`instructor-${props.data}`}
                className={`space-y-3 overflow-hidden relative ${
                    elHeight > 400 && !showFullContent && 'h-[400px]'
                }`}
            >
                <div className="text-justify">
                    {`I'm Angela, I'm a developer with a passion for teaching. I'm the `}
                    <span className="font-bold">lead instructor</span>
                    {` at the London App Brewery, London's leading `}
                    <span className="font-bold">Programming Bootcamp</span>
                    {`. I've helped hundreds of thousands of students learn to code and change their lives by becoming a developer. I've been invited by companies such as Twitter, Facebook and Google to teach their employees.`}
                </div>
                <div>
                    {`My first foray into programming was when I was just 12 years old, wanting to build my own Space Invader game. Since then, I've made `}
                    <span className="font-bold">
                        hundred of websites, apps and games
                    </span>
                    {`. But most importantly, I realised that my greatest passion is teaching.`}
                </div>
                <div>
                    {`I'm Angela, I'm a developer with a passion for teaching. I'm the `}
                    <span className="font-bold">lead instructor</span>
                    {` at the London App Brewery, London's leading `}
                    <span className="font-bold">Programming Bootcamp</span>
                    {`. I've helped hundreds of thousands of students learn to code and change their lives by becoming a developer. I've been invited by companies such as Twitter, Facebook and Google to teach their employees.`}
                </div>
                <div>
                    {`My first foray into programming was when I was just 12 years old, wanting to build my own Space Invader game. Since then, I've made `}
                    <span className="font-bold">
                        hundred of websites, apps and games
                    </span>
                    {`. But most importantly, I realised that my greatest passion is teaching.`}
                </div>
                <div>
                    {`I'm Angela, I'm a developer with a passion for teaching. I'm the `}
                    <span className="font-bold">lead instructor</span>
                    {` at the London App Brewery, London's leading `}
                    <span className="font-bold">Programming Bootcamp</span>
                    {`. I've helped hundreds of thousands of students learn to code and change their lives by becoming a developer. I've been invited by companies such as Twitter, Facebook and Google to teach their employees.`}
                </div>
                <div>
                    {`My first foray into programming was when I was just 12 years old, wanting to build my own Space Invader game. Since then, I've made `}
                    <span className="font-bold">
                        hundred of websites, apps and games
                    </span>
                    {`. But most importantly, I realised that my greatest passion is teaching.`}
                </div>
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
                        onClick={() => setShowFullContent(!showFullContent)}
                    >
                        <span className="text-hyperlink font-bold mr-2">
                            Show {!showFullContent ? 'more' : 'less'}
                        </span>
                        <FontAwesomeIcon
                            icon={
                                !showFullContent ? faChevronDown : faChevronUp
                            }
                            className="text-hyperlink"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
