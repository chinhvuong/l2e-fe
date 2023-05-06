import ShowMore from '@/components/core/show-more'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { useCourseDetailContext } from '../course-detail-context'

export interface IWhatYouWillLearnProps {}

export default function WhatYouWillLearn() {
    const { data } = useCourseDetailContext()
    const goals = data?.goals

    return (
        <>
            {goals && (
                <div
                    id="what-you-will-learn"
                    className="w-full space-y-3 overflow-hidden relative"
                >
                    <span className="font-semibold text-[26px]">
                        What you’ll learn
                    </span>
                    <div className="flex flex-wrap justify-between under_lg:flex-col">
                        {goals.map((item: string, index: number) => {
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
                                        className={`w-[360px] lg:w-[270px] under_lg:w-full md:text-left text-justify`}
                                    >
                                        {item}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}
        </>
    )
}
