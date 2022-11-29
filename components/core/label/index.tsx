import { CourseLabel } from '@/constants/types'
import * as React from 'react'

export interface ILabelProps {
    name: string
    color?: string
    hidden?: boolean
}

export default function Label(props: ILabelProps) {
    return (
        <div
            className={`text-[9px] rounded-[80px] px-2 py-1 w-fit text-white font-semibold ${
                props.hidden && 'hidden'
            }`}
            style={
                props.color
                    ? {
                          backgroundColor: props.color,
                      }
                    : {
                          background:
                              'linear-gradient(to right, #FF0000, rgba(254,207,87,1))',
                      }
            }
        >
            {props.name}
        </div>
    )
}
