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
            className={`${textButton ? 'btn-text' : 'btn-common'} ${
                disabled ? 'bg-gray-600 text-white' : 'btn-primary'
            } ${rest.className} flex items-center ${
                isLoading ? 'cursor-not-allowed' : 'cursor-pointer'
            } whitespace-nowrap	text-ellipsis overflow-hidden`}
            disabled={disabled}
        >
            {children}
            {isLoading && <Loading className="!text-white ml-2" />}
        </button>
    )
}

export default Button
