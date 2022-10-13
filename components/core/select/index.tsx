import React, { useState, useRef, HTMLAttributes } from 'react'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useOutsideClick from '@/hooks/useOutSideClick'
import './style.scss'
type Props = {
    data: any[]
    renderItem: Function
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
    const clickOutSideRef = useRef(null)

    const handlePressShow = () => {
        setShow(!show)
    }

    useOutsideClick(clickOutSideRef, () => {
        setShow(false)
    })

    return (
        <div
            ref={clickOutSideRef}
            className=" bg-white text-black cursor-pointer select-none px-6 py-3 shadow-40-08 rounded-lg relative w-full"
            onClick={handlePressShow}
        >
            <div className="flex justify-between items-center">
                <div {...rest}>{textShow || placeholder}</div>
                <FontAwesomeIcon
                    icon={faChevronUp}
                    className={`arrow-animation ease-in rotate-${
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
