import React, { HTMLAttributes, ReactNode, ReactText } from 'react'
import './style.scss'
type IButton = {
    children: ReactNode | ReactText
    textButton?: boolean,
    disabled?: boolean
}

function Button({
    children,
    textButton,
    disabled,

    ...rest
}: IButton & HTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...rest}
            className={`${textButton ? 'btn-text' : 'btn-primary btn-common'} ${rest.className
                }`}
            disabled={disabled}
        >
            {children}
        </button>
    )
}

export default Button
