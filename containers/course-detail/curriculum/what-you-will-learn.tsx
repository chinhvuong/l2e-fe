import { useState, useEffect } from 'react'
import {
    faCheck,
    faChevronDown,
    faChevronUp,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux'
import { getWhatYouWillLearn } from '@/state/course/selectors'

export interface IWhatYouWillLearnProps {}

export default function WhatYouWillLearn() {
    const data = useSelector(getWhatYouWillLearn)
    const [elHeight, setElHeight] = useState(0)
    const [showFullContent, setShowFullContent] = useState(false)

    useEffect(() => {
        setElHeight(
            document.getElementById('what-you-will-learn')?.scrollHeight ?? 0,
        )
    }, [])

    return (
        <div
            id="what-you-will-learn"
            className={`border border-border-box w-full space-y-3 py-6 px-9 overflow-hidden relative ${
                elHeight > 400 && !showFullContent && 'h-[400px]'
            }`}
        >
            <span className="font-semibold text-[26px]">What you’ll learn</span>
            <div className="flex flex-wrap justify-between">
                {data.map((item, index) => {
                    return (
                        <div
                            className="flex items-start space-x-3 mb-2"
                            key={index}
                        >
                            <FontAwesomeIcon icon={faCheck} className="mt-1" />
                            <div
                                className={`w-[330px] text-justify ${
                                    !showFullContent && 'line-clamp-3'
                                }`}
                            >
                                {item}
                            </div>
                        </div>
                    )
                })}
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
                        !showFullContent && 'pl-9 pb-9 bg-white'
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
