import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { debounce } from 'lodash'
import * as React from 'react'
import { useCallback } from 'react'

interface ISearch {
    darkTheme: boolean
    setSearch: React.Dispatch<React.SetStateAction<string>>
    className?: string
}

export default function Search({ darkTheme, setSearch, className }: ISearch) {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }
    const debounceLoadData = useCallback(debounce(handleInputChange, 600), [])
    return (
        <div className={`relative ${className}`}>
            <div
                className={`w-[400px] xl:w-[200px] py-[10px] bg-white rounded-[80px] my-[20px] pl-[20px] flex items-center text-black ${
                    !darkTheme && 'border-[1px] border-black'
                }`}
            >
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                <input
                    className="ml-[20px] w-[320px] xl:w-[120px] outline-none"
                    onChange={debounceLoadData}
                    type="text"
                ></input>
            </div>
        </div>
    )
}
