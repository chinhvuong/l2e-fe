import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import './style.scss'

interface ISearch {
    darkTheme: boolean
}

export default function Search(props: ISearch) {
    return (
        <div
            className={`w-[400px] xl:w-[200px] under_lg:hidden py-[10px] bg-white rounded-[80px] my-[20px] pl-[20px] flex items-center text-black ${
                props.darkTheme ? '' : 'border-[1px] border-black'
            }`}
        >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <input className="ml-[20px] w-[320px] xl:w-[120px] outline-none"></input>
        </div>
    )
}
