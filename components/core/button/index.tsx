import React, { HTMLAttributes, ReactNode, ReactText } from 'react'
import './style.scss'
type Props = {
    children: ReactNode | ReactText
}

// w-fit

function Button({
    children,
    ...rest
}: Props & HTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...rest}
            className={`rounded-[80px] py-[12px] px-[30px] cursor-pointer shadow-sm btn-primary ${rest.className}`}
        >
            {children}
        </button>
    )
}

export default Button
