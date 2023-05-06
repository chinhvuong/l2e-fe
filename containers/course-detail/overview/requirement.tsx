import * as React from 'react'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ShowMore from '@/components/core/show-more'
import { useCourseDetailContext } from '../course-detail-context'

export interface IRequirementProps {}

export default function Requirement() {
    const { data } = useCourseDetailContext()
    const requirements = data?.requirements

    return (
        <>
            {requirements && (
                <div
                    id="requirement"
                    className="space-y-3 overflow-hidden relative"
                >
                    <div className="font-semibold text-[26px]">Requirement</div>
                    {requirements.map((item: string, index: number) => {
                        return (
                            <div className="flex items-start" key={index}>
                                <FontAwesomeIcon
                                    icon={faCircle}
                                    className="text-[8px] pr-5 pt-2"
                                />
                                <div>{item}</div>
                            </div>
                        )
                    })}
                </div>
            )}
        </>
    )
}
