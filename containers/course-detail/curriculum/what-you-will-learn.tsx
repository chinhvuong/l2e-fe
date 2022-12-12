import { useState } from 'react'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ShowMore from '@/components/core/show-more'
import { useAppSelector } from '@/hooks'
import { getGoals } from '@/store/course/selectors'

export interface IWhatYouWillLearnProps {}

export default function WhatYouWillLearn() {
    const data = useAppSelector(getGoals)
    const [showFullContent, setShowFullContent] = useState(true)

    return (
        <>
            {!data.every((item) => item === '') && (
                <div
                    id="what-you-will-learn"
                    className="w-full space-y-3 overflow-hidden relative"
                >
                    <span className="font-semibold text-[26px]">
                        What you’ll learn
                    </span>
                    <div className="flex flex-wrap justify-between under_lg:flex-col">
                        {data.map((item, index) => {
                            return (
                                <div
                                    className="flex items-start space-x-3 mb-2"
                                    key={index}
                                >
                                    <FontAwesomeIcon
                                        icon={faCheck}
                                        className="mt-1"
                                    />
                                    <div
                                        className={`w-[360px] lg:w-[270px] under_lg:w-full md:text-left text-justify ${
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
                        setShowFullContent={setShowFullContent}
                    />
                </div>
            )}
        </>
    )
}
