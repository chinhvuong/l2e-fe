import { useState, useEffect } from 'react'
import {
    faChevronDown,
    faChevronUp,
    faCircle,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export interface IDescriptionProps {}

export default function Description() {
    const [elHeight, setElHeight] = useState(0)
    const [showFullContent, setShowFullContent] = useState(false)

    useEffect(() => {
        setElHeight(document.getElementById('description')?.scrollHeight ?? 0)
    }, [])

    return (
        <div
            id="description"
            className={`space-y-3 overflow-hidden relative ${
                elHeight > 400 && !showFullContent && 'h-[400px]'
            }`}
        >
            <div className="font-semibold text-[26px]">Description</div>
            <div>
                {`Welcome to the 100 Days of Code - The Complete Python Pro
                Bootcamp, `}{' '}
                <span className="font-bold">the only course you need</span>
                {` to learn to code with Python.
                With over 500,000 `}{' '}
                <span className="font-bold">5 STAR reviews</span>
                {` and a 4.8 average, my courses
                are some of the HIGHEST RATED courses in the history of Udemy!`}
                <div className="font-bold">
                    100 days, 1 hour per day, learn to build 1 project per day,
                    this is how you master Python.
                </div>
                {` At 60+ hours, this Python course is
                without a doubt the `}
                <span className="font-bold">most comprehensive</span>
                {` Python course available
                anywhere online. Even if you have `}
                <span className="font-bold">zero</span>
                {` programming experience,
                this course will take you from `}
                <span className="font-bold">beginner to professional</span>
                {`. Here's
                why:`}
            </div>
            <div className="flex items-start">
                <FontAwesomeIcon
                    icon={faCircle}
                    className="text-[10px] pr-5 pt-2"
                />
                <div>
                    {`The course is taught by the `}
                    <span className="font-bold">lead instructor</span>
                    {` at the App Brewery, London's `}{' '}
                    <span className="font-bold">
                        best in-person programming Bootcamp.
                    </span>
                </div>
            </div>
            <div className="flex items-start">
                <FontAwesomeIcon
                    icon={faCircle}
                    className="text-[10px] pr-5 pt-2"
                />
                <div>
                    {`The course has been updated to be `}
                    <span className="font-bold">2022 ready</span>
                    {` and you'll be learning the latest tools and technologies used at large companies such as Apple, Google and Netflix.`}
                </div>
            </div>
            <div className="flex items-start">
                <FontAwesomeIcon
                    icon={faCircle}
                    className="text-[10px] pr-5 pt-2"
                />
                <div>
                    {`The course is taught by the `}
                    <span className="font-bold">lead instructor</span>
                    {` at the App Brewery, London's `}{' '}
                    <span className="font-bold">
                        best in-person programming Bootcamp.
                    </span>
                </div>
            </div>
            <div className="flex items-start">
                <FontAwesomeIcon
                    icon={faCircle}
                    className="text-[10px] pr-5 pt-2"
                />
                <div>
                    {`The course has been updated to be `}
                    <span className="font-bold">2022 ready</span>
                    {` and you'll be learning the latest tools and technologies used at large companies such as Apple, Google and Netflix.`}
                </div>
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
                        icon={!showFullContent ? faChevronDown : faChevronUp}
                        className="text-hyperlink"
                    />
                </div>
            </div>
        </div>
    )
}
