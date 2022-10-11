import { useState } from 'react'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux'
import { getWhatYouWillLearn } from '@/store/course/selectors'
import ShowMore from '@/components/core/show-more'

export interface IWhatYouWillLearnProps {}

export default function WhatYouWillLearn() {
    const data = useSelector(getWhatYouWillLearn)
    const [elHeight, setElHeight] = useState('')
    const [showFullContent, setShowFullContent] = useState(false)

    return (
        <div
            id="what-you-will-learn"
            className={`w-full space-y-3 overflow-hidden relative ${elHeight}`}
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
                                className={`w-[360px] lg:w-[270px] md:w-[200px] md:text-left text-justify ${
                                    !showFullContent && 'line-clamp-3'
                                }`}
                            >
                                {item}
                            </div>
                        </div>
                    )
                })}
            </div>
            <ShowMore
                el="what-you-will-learn"
                elHeightPreview={400}
                changeElHeight={setElHeight}
                setShowFullContent={setShowFullContent}
            />
        </div>
    )
}
