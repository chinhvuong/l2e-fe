import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import './style.scss'
import { CourseLists } from '@/data/courses'
import { useCallback, useMemo, useState } from 'react'
import { debounce } from 'lodash'
import { CoursePreview } from '@/api/dto/course.dto'
import Router from 'next/router'
import { callAPI } from '@/api/axios-client'

interface ISearch {
    darkTheme: boolean
}

export default function Search(props: ISearch) {
    const [searchTerm, setSearchTerm] = useState('')
    const [result, setResult] = useState<CoursePreview[]>([])

    async function fetchData(e: React.ChangeEvent<HTMLInputElement>) {
        const queryword = e.target.value
        console.log(queryword)
        setSearchTerm(queryword)
        const { data } = await callAPI(
            'get',
            '/course?limit=5&query=' + queryword,
            {},
        )
        setResult(data)
    }
    const debounceLoadData = useCallback(debounce(fetchData, 500), [])
    const goToSearchPageCourse = () => {
        Router.push('course/search?query=' + searchTerm)
    }
    return (
        <div className="relative">
            <div
                className={`w-[400px] xl:w-[200px] under_xl:hidden py-[10px] bg-white rounded-[80px] my-[20px] pl-[20px] flex items-center text-black ${
                    !props.darkTheme && 'border-[1px] border-black'
                }`}
            >
                <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    onClick={() => goToSearchPageCourse()}
                />
                <input
                    className="ml-[20px] w-[320px] xl:w-[120px] outline-none"
                    onChange={debounceLoadData}
                    type="text"
                ></input>
            </div>
            {result.length > 0 && (
                <div className="absolute z-10">
                    {result.map((f) => (
                        <div
                            className={`flex bg-white items-center text-black py-[5px] hover:bg-gray-400`}
                            key={f._id}
                        >
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                            <a
                                className={`flex items-center pl-[10px]`}
                                href={'course/' + f._id}
                            >
                                {' '}
                                {f.name}
                            </a>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
