import { UserAPI } from '@/api/api-path'
import { CoursePreview } from '@/api/dto/course.dto'
import useAPI from '@/api/hooks/useAPI'
import useOutsideClick from '@/hooks/useOutSideClick'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { debounce, noop } from 'lodash'
import { useRouter } from 'next/router'
import * as React from 'react'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import './style.scss'

interface ISearch {
    darkTheme: boolean
}

export default function Search(props: ISearch) {
    const router = useRouter()
    const [searchTerm, setSearchTerm] = useState(router.query.query)
    const [result, setResult] = useState<CoursePreview[]>([])

    const [openResultSelect, setOpenResultSelect] = useState(true)
    const clickOutSideRef = React.useRef(null)
    const dispatch = useDispatch()

    useOutsideClick(clickOutSideRef, () => {
        setOpenResultSelect(false)
    })

    const { mutate: getSearchResults } = useAPI.getMutation(
        UserAPI.GET_ALL_COURSES + '?limit=5&query=' + searchTerm,
        {
            onSuccess(response) {
                setResult(response.data)
            },
            onError: noop,
        },
    )

    const handleGetSearchResults = (queryword: string) => {
        if (queryword !== '') {
            setOpenResultSelect(true)
            getSearchResults({})
        } else {
            setOpenResultSelect(false)
        }
    }

    const debounceLoadData = useCallback(
        debounce((queryword) => handleGetSearchResults(queryword), 600),
        [],
    )
    const goToSearchPageCourse = () => {
        router.push(
            {
                pathname: '/course/search',
                query: { query: searchTerm },
            },
            undefined,
            { shallow: true },
        )
    }
    const handleEnterEvent = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            goToSearchPageCourse()
        }
    }
    useEffect(() => {
        if (router.query.query) {
            setSearchTerm(router.query.query)
        }
        return () => {
            debounceLoadData.cancel()
        }
    }, [router.query.query])

    return (
        <div className="relative flex-grow">
            <div
                className={`py-[10px] bg-white rounded-[80px] pl-[20px] flex items-center text-black ${
                    !props.darkTheme && 'border-[1px] border-black'
                }`}
            >
                <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    onClick={() => goToSearchPageCourse()}
                />
                <input
                    className="mx-[20px] w-full outline-none"
                    onChange={(e) => {
                        const queryword = e.target.value
                        setSearchTerm(queryword)
                        debounceLoadData(queryword)
                    }}
                    type="text"
                    value={searchTerm}
                    onKeyDown={handleEnterEvent}
                ></input>
            </div>
            {result.length > 0 && (
                <div
                    className={`absolute z-10 border border-description mt-[2px] w-full ${
                        !openResultSelect && 'hidden'
                    }`}
                    onClick={() => setOpenResultSelect(!openResultSelect)}
                    ref={clickOutSideRef}
                >
                    {result.map((item) => (
                        <div
                            className={`flex bg-white items-center text-black space-x-[18px] px-4 py-4 hover:bg-gray-300 cursor-pointer`}
                            key={item._id}
                        >
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                            <a
                                className={`flex items-center font-bold line-clamp-2`}
                                href={'course/' + item._id}
                            >
                                {item.name}
                            </a>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
