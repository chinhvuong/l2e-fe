import React, { useEffect, useState, useRef } from 'react'
import ArrowUp from '@/public/svgs/arrow-up.svg'
import useOutsideClick from '@/hooks/useOutSideClick'
import './style.scss'
type Props = {
    title: string
    currentValue: number
    data: any[]
    // eslint-disable-next-line no-unused-vars
    renderItem: (data: any, index: number) => void
}

function Select({ currentValue, title, data, renderItem }: Props) {
    const [show, setShow] = useState(true)
    const clickOutSideref = useRef(null)
    const [value, setValue] = useState('')

    const handlePressShow = () => {
        setShow(!show)
    }

    useOutsideClick(clickOutSideref, () => {
        setShow(false)
    })

    useEffect(() => {
        if (currentValue < 0) {
            setValue(title)
        } else {
            setValue(data[currentValue])
        }
    }, [currentValue])

    return (
        <div
            ref={clickOutSideref}
            className=" bg-white text-black cursor-pointer select-none px-4 py-3 shadow-40-08 rounded-lg relative w-full"
            onClick={handlePressShow}
        >
            <div className="flex justify-between items-center">
                <div>{value}</div>
                <ArrowUp
                    className={`arow-animate ease-in rotate-${
                        show ? '90' : '180'
                    }`}
                />
            </div>
            {show && (
                <div className="absolute bg-white top-[105%] w-full left-[0]">
                    {renderItem('no title', -1)}
                    {data.map((item, index) => {
                        return renderItem(item, index)
                    })}
                </div>
            )}
        </div>
    )
}

export default Select
