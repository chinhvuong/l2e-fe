import React, { HTMLAttributes, ReactNode, ReactText } from 'react'
import Loading from '../animate/loading'
type IButton = {
    children: ReactNode | ReactText
    textButton?: boolean
    disabled?: boolean
    isLoading?: boolean
    outline?: boolean
}

function Button({
    children,
    textButton,
    disabled,
    isLoading = false,
    outline = false,
    ...rest
}: IButton & HTMLAttributes<HTMLButtonElement>) {
    const btnPrimary =
        'bg-primary text-white enabled:hover:bg-primary-hover transition-colors'

    const btnPrimaryOutline =
        'bg-white border border-primary text-primary enabled:hover:bg-primary-hover enabled:hover:text-white enabled:hover:border-primary-hover transition-colors'

    const btnCommon = 'rounded-[80px] py-[12px] px-[30px] shadow-sm'

    const btnText = 'text-black hover:text-primary'

    return (
        <button
            {...rest}
            className={`${outline ? btnPrimaryOutline : btnPrimary} ${
                textButton ? btnText : btnCommon
            } flex items-center ${
                isLoading || disabled ? 'cursor-not-allowed' : 'cursor-pointer'
            } whitespace-nowrap	text-ellipsis overflow-hidden ${
                disabled && 'bg-gray-400'
            } ${rest.className}`}
            disabled={disabled}
        >
            {children}
            {isLoading && <Loading className="!text-white ml-2" />}
        </button>
    )
}

export default Button
