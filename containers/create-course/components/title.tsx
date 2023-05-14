import React, { ReactNode, ReactText } from 'react'

export interface ITitleProps {
    title: string
    children?: ReactNode | ReactText
}

export default function Title(props: ITitleProps) {
    return (
        <div className="flex justify-between items-center py-10 px-14 font-bold text-2xl border-b-2 under_xl:py-5 under_xl:px-7 under_xl:text-lg">
            {props.title}
            {props.children}
        </div>
    )
}
