import React, { HTMLAttributes, ReactNode, ReactText } from 'react'
import Loading from '../animate/loading'
import './style.scss'
type IButton = {
    children: ReactNode | ReactText
    textButton?: boolean
    disabled?: boolean
    isLoading?: boolean
}

function Button({
    children,
    textButton,
    disabled,
    isLoading = false,
    ...rest
}: IButton & HTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...rest}
            className={`${textButton ? 'btn-text' : 'btn-primary btn-common'} ${
                rest.className
            } flex items-center ${
                isLoading ? 'cursor-not-allowed' : 'cursor-pointer'
            }`}
            disabled={disabled}
        >
            {children}
            {isLoading && <Loading className="!text-white ml-2" />}
        </button>
    )
}

export default Button
