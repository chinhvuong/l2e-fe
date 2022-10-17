import * as React from 'react'

export interface ISubtitleProps {
    title: string
}

export default function Subtitle(props: ISubtitleProps) {
    return <div className="font-bold">{props.title}</div>
}
