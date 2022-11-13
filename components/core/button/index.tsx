import React, { HTMLAttributes, ReactNode, ReactText } from 'react'
import './style.scss'
type IButton = {
    children: ReactNode | ReactText
    textButton?: boolean
}

function Button({
    children,
    textButton,
    ...rest
}: IButton & HTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...rest}
            className={`${textButton ? 'btn-text' : 'btn-primary btn-common'} ${
                rest.className
            }`}
        >
            {children}
        </button>
    )
}

export default Button
