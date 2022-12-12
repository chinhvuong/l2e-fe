import * as React from 'react'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getRequirements } from '@/store/course/selectors'
import ShowMore from '@/components/core/show-more'
import { useAppSelector } from '@/hooks'

export interface IRequirementProps {}

export default function Requirement() {
    const data = useAppSelector(getRequirements)

    return (
        <>
            {!data.every((item) => item === '') && (
                <div
                    id="requirement"
                    className="space-y-3 overflow-hidden relative"
                >
                    <div className="font-semibold text-[26px]">Requirement</div>
                    {data.map((item, index) => {
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
                    <ShowMore el="requirement" elHeightPreview={400} />
                </div>
            )}
        </>
    )
}
