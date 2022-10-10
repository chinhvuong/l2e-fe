import { useState, useEffect } from 'react'
import {
    faChevronDown,
    faChevronUp,
    faCircle,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux'
import { getRequirements } from '@/state/course/selectors'

export interface IRequirementProps {}

export default function Requirement() {
    const data = useSelector(getRequirements)
    const [elHeight, setElHeight] = useState(0)
    const [showFullContent, setShowFullContent] = useState(false)

    useEffect(() => {
        setElHeight(document.getElementById('requirement')?.scrollHeight ?? 0)
    }, [])

    return (
        <div
            id="requirement"
            className={`space-y-3 overflow-hidden relative ${
                elHeight > 400 && !showFullContent && 'h-[400px]'
            }`}
        >
            <div className="font-semibold text-[26px]">Requirement</div>
            {data.map((item, index) => {
                return (
                    <div className="flex items-start" key={index}>
                        <FontAwesomeIcon
                            icon={faCircle}
                            className="text-[10px] pr-5 pt-2"
                        />
                        <div>{item}</div>
                    </div>
                )
            })}
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
