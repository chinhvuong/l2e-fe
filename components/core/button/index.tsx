import React, { HTMLAttributes, ReactNode, ReactText } from 'react'
import Loading from '../animate/loading'
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
    const btnPrimary =
        'bg-primary text-white enabled:hover:bg-primary-hover transition-colors'

    const btnCommon = 'rounded-[80px] py-[12px] px-[30px] shadow-sm'

    const btnText = 'text-black hover:text-primary'

    return (
        <button
            {...rest}
            className={`${btnPrimary} ${textButton ? btnText : btnCommon} ${
                rest.className
            } flex items-center ${
                isLoading || disabled ? 'cursor-not-allowed' : 'cursor-pointer'
            } whitespace-nowrap	text-ellipsis overflow-hidden`}
            disabled={disabled}
        >
            {children}
            {isLoading && <Loading className="!text-white ml-2" />}
        </button>
    )
}

export default Button
