import React, { HTMLAttributes, ReactNode, ReactText } from 'react'

type Props = {
    children: ReactNode | ReactText
}

function Button({
    children,
    ...rest
}: Props & HTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...rest}
            className={`px-4 py-2 rounded-sm shadow-sm bg-primary hover:bg-primary/95 ${rest.className}`}
        >
            {children}
        </button>
    )
}

export default Button
