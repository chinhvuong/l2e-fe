import React, { useEffect, useState, useCallback } from 'react'
import Button from '../button'
import ArrowRight from '@/public/svgs/arrow-right.svg'
import './style.scss'
type Props = {
    totalPage: number
    currentPage: number
    // eslint-disable-next-line no-unused-vars
    onClick: (page: number) => void
}

function Pagination({ totalPage, onClick, currentPage }: Props) {
    const [buttonList, setButtonList] = useState<JSX.Element[]>([])

    const pageButton = useCallback(
        (number: number, isDot: boolean) => (
            <Button
                key={number}
                className={`pagination-el ${
                    currentPage === number ? '' : '!bg-white !text-black'
                }`}
                onClick={() => onClick(number)}
            >
                {isDot ? '...' : number}
            </Button>
        ),
        [currentPage],
    )

    useEffect(() => {
        const pageButtonList = [pageButton(1, false)] as JSX.Element[]
        if (totalPage < 4) {
            for (let i = 2; i <= totalPage; i++) {
                pageButtonList.push(pageButton(i, false))
            }
            return setButtonList(pageButtonList)
        }

        if (currentPage > 3 && currentPage < totalPage - 2) {
            for (let i = currentPage - 2; i <= currentPage + 2; i++) {
                pageButtonList.push(
                    pageButton(i, Math.abs(currentPage - i) === 2),
                )
            }
        } else {
            const total =
                totalPage - currentPage < 5
                    ? totalPage - currentPage + 2
                    : currentPage + 1
            for (let i = 1; i <= total; i++) {
                let pageNum = 0
                switch (total) {
                    case 4: {
                        pageNum =
                            currentPage === 3
                                ? currentPage + i - 2
                                : currentPage + i - 3
                        break
                    }
                    case 3: {
                        pageNum =
                            currentPage === 2 ? i + 1 : currentPage + i - 3
                        break
                    }
                    case 2: {
                        pageNum =
                            currentPage === 1
                                ? currentPage + i
                                : currentPage + i - 3
                    }
                }
                pageButtonList.push(
                    pageButton(pageNum, Math.abs(pageNum - currentPage) === 2),
                )
            }
        }
        pageButtonList.push(pageButton(totalPage, false))
        setButtonList(pageButtonList)
    }, [currentPage])

    return (
        <div className="flex">
            {currentPage > 1 && totalPage >= currentPage && (
                <div
                    onClick={() => onClick(currentPage - 1)}
                    className="pagination-el-arrow"
                >
                    <ArrowRight className="pagination-el-arrow-svg rotate-180" />
                </div>
            )}
            {buttonList}
            {currentPage < totalPage && (
                <div
                    onClick={() => onClick(currentPage + 1)}
                    className="pagination-el-arrow"
                >
                    <ArrowRight className="pagination-el-arrow-svg" />
                </div>
            )}
        </div>
    )
}

export default Pagination
