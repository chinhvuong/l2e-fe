import {
    faChevronLeft,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dispatch, SetStateAction, useState } from 'react'

export interface IPaginationProps {
    totalPage: number
    setPageNumber: Dispatch<SetStateAction<number>>
}

export default function Pagination({
    totalPage: total,
    setPageNumber: setPage,
}: IPaginationProps) {
    const [pageNumber, setPageNumber] = useState(1)
    const [totalPage, setTotalPage] = useState(total)

    const handleChangePageNumber = (page: number): void => {
        setPageNumber(page)
        setPage(page)
    }

    const getPaginationStepUI = () => {
        const isCurrentPageClassName =
            'z-10 bg-indigo-600 text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
        const isNotCurrentPageClassName =
            'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
        const commonPageNumberClassName =
            'relative inline-flex items-center px-4 py-2 text-sm font-semibold  focus:z-20 cursor-pointer'

        if (totalPage <= 5 || pageNumber + 3 >= totalPage) {
            const pagination =
                totalPage <= 5
                    ? Array(totalPage)
                          .fill(0)
                          .map((_, index) => index + 1)
                    : Array(5)
                          .fill(0)
                          .map((_, index) => totalPage - 4 + index)

            return (
                <>
                    {pagination.map((item) => {
                        return (
                            <div
                                className={`${commonPageNumberClassName} ${
                                    pageNumber === item
                                        ? isCurrentPageClassName
                                        : isNotCurrentPageClassName
                                }`}
                                onClick={() => handleChangePageNumber(item)}
                                key={item}
                            >
                                {item}
                            </div>
                        )
                    })}
                </>
            )
        }

        return (
            <>
                <div
                    className={`${commonPageNumberClassName} ${isCurrentPageClassName}`}
                    onClick={() => handleChangePageNumber(pageNumber)}
                >
                    {pageNumber}
                </div>
                <div
                    className={`${commonPageNumberClassName} ${isNotCurrentPageClassName}`}
                    onClick={() => {
                        if (pageNumber < totalPage) {
                            handleChangePageNumber(pageNumber + 1)
                        }
                    }}
                >
                    {pageNumber + 1}
                </div>
                <div className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                    ...
                </div>
                <div
                    className={`${commonPageNumberClassName} ${isNotCurrentPageClassName}`}
                    onClick={() => handleChangePageNumber(totalPage - 1)}
                >
                    {totalPage - 1}
                </div>
                <div
                    className={`${commonPageNumberClassName} ${isNotCurrentPageClassName}`}
                    onClick={() => handleChangePageNumber(totalPage)}
                >
                    {totalPage}
                </div>
            </>
        )
    }

    return (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div className="sm:flex sm:flex-1 sm:justify-between hidden">
                <div
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
                    onClick={() => {
                        if (pageNumber > 1) {
                            handleChangePageNumber(pageNumber - 1)
                        }
                    }}
                >
                    Previous
                </div>
                <div
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
                    onClick={() => {
                        if (pageNumber < totalPage) {
                            handleChangePageNumber(pageNumber + 1)
                        }
                    }}
                >
                    Next
                </div>
            </div>
            <div className="flex justify-end w-full sm:hidden">
                <nav
                    className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                    aria-label="Pagination"
                >
                    <div
                        className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer"
                        onClick={() => {
                            if (pageNumber > 1) {
                                handleChangePageNumber(pageNumber - 1)
                            }
                        }}
                    >
                        <FontAwesomeIcon
                            icon={faChevronLeft}
                            className="text-xs px-1"
                        />
                    </div>
                    {getPaginationStepUI()}
                    <div
                        className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer"
                        onClick={() => {
                            if (pageNumber < totalPage) {
                                handleChangePageNumber(pageNumber + 1)
                            }
                        }}
                    >
                        <FontAwesomeIcon
                            icon={faChevronRight}
                            className="text-xs px-1"
                        />
                    </div>
                </nav>
            </div>
        </div>
    )
}
