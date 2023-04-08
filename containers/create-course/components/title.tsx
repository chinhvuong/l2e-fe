import React, { ReactNode, ReactText } from 'react'

export interface ITitleProps {
    title: string
    children?: ReactNode | ReactText
}

export default function Title(props: ITitleProps) {
    return (
        <div className="flex justify-between items-center py-10 px-14 font-bold text-2xl border-b-2">
            {props.title}
            {props.children}
        </div>
    )
}
