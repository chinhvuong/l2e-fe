import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

export interface IExploreProps {}

export default function Explore() {
    return (
        <div className="flex items-center cursor-pointer hover:text-primary-hover under_lg:hidden">
            <div className="mr-[10px]">Explore</div>
            <FontAwesomeIcon icon={faChevronDown} />
        </div>
    )
}
