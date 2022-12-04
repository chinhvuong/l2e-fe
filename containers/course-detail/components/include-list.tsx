import * as React from 'react'
import {
    faTv,
    faFile,
    faCloudArrowDown,
    faCode,
    faInfinity,
    faMobileScreenButton,
    faClipboardList,
    faAward,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export interface IIncludeListProps {
    data: {
        duration: string
        articles: string
        resource: string
        exercise: string
        lifetimeAccess: string
        device: string
        assignments: string
        certificate: string
    }
    className?: string
}

export default function IncludeList(props: IIncludeListProps) {
    return (
        <div className={`space-y-3 ${props.className}`}>
            <span className="font-bold">This course includes:</span>
            <div className="flex space-x-3">
                <div className="flex flex-col items-center space-y-3 pt-[2px]">
                    <FontAwesomeIcon icon={faTv} className="text-[20px]" />
                    <FontAwesomeIcon icon={faFile} className="text-[20px]" />
                    <FontAwesomeIcon
                        icon={faCloudArrowDown}
                        className="text-[20px]"
                    />
                    <FontAwesomeIcon icon={faCode} className="text-[20px]" />
                    <FontAwesomeIcon
                        icon={faInfinity}
                        className="text-[20px]"
                    />
                    <FontAwesomeIcon
                        icon={faMobileScreenButton}
                        className="text-[20px]"
                    />
                    <FontAwesomeIcon
                        icon={faClipboardList}
                        className="text-[20px]"
                    />
                    <FontAwesomeIcon icon={faAward} className="text-[20px]" />
                </div>
                <div className="flex flex-col space-y-2">
                    <span>{props.data.duration}</span>
                    <span>{props.data.articles}</span>
                    <span>{props.data.resource}</span>
                    <span>{props.data.exercise}</span>
                    <span>{props.data.lifetimeAccess}</span>
                    <span>{props.data.device}</span>
                    <span>{props.data.assignments}</span>
                    <span>{props.data.certificate}</span>
                </div>
            </div>
        </div>
    )
}
