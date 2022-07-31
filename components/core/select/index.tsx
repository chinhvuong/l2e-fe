import React, { useState, useRef, HTMLAttributes } from 'react'
import ArrowUp from '@/public/svgs/arrow-up.svg'
import useOutsideClick from '@/hooks/useOutSideClick'
import './style.scss'
type Props = {
    data: any[]
    // eslint-disable-next-line no-unused-vars
    renderItem: (data: any, index: number) => void
    textShow?: any
    placeholder?: string
}

function Select({
    data,
    renderItem,
    textShow,
    placeholder,
    ...rest
}: Props & HTMLAttributes<HTMLDivElement>) {
    const [show, setShow] = useState(false)
    const clickOutSideref = useRef(null)

    const handlePressShow = () => {
        setShow(!show)
    }

    useOutsideClick(clickOutSideref, () => {
        setShow(false)
    })

    return (
        <div
            ref={clickOutSideref}
            className=" bg-white text-black cursor-pointer select-none px-4 py-3 shadow-40-08 rounded-lg relative w-full"
            onClick={handlePressShow}
        >
            <div className="flex justify-between items-center">
                <div {...rest}>{textShow || placeholder}</div>
                <ArrowUp
                    className={`arow-animate ease-in rotate-${
                        show ? '0' : '180'
                    }`}
                />
            </div>
            {show && (
                <div className="selector-list">
                    {renderItem(placeholder, -1)}
                    {data.map((item, index) => {
                        return renderItem(item, index)
                    })}
                </div>
            )}
        </div>
    )
}

export default Select
