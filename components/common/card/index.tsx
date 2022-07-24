import React, { HTMLAttributes } from 'react'

type Props = {
    children: any
    title: string
}

function Card({
    children,
    title,
    ...rest
}: Props & HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            {...rest}
            className={`card p-6 md:p-4 rounded-lg shadow-30 [&>hr]:p-4 ${rest.className}`}
        >
            <div className="mb-4 font-semibold leading-[19px]">{title}</div>
            <hr className="" />
            {children}
        </div>
    )
}

export default Card
