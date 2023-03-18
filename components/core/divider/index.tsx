import * as React from 'react'

export interface IDividerProps {
    className?: string
}

export default function Divider({ className }: IDividerProps) {
    return <hr className={`border border-border-box ${className}`}></hr>
}
