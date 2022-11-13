import * as React from 'react'

export interface ITitleProps {
    title: string
}

export default function Title(props: ITitleProps) {
    return (
        <div className="py-10 px-14 font-bold text-2xl border-b-2">
            {props.title}
        </div>
    )
}
