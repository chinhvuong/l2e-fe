import { CourseLabel } from '@/constants/types'
import * as React from 'react'

export interface ILabelProps {
    name: CourseLabel
    hidden?: boolean
}

export default function Label(props: ILabelProps) {
    const bkg_code = {
        IT: 'it',
        Health: 'health',
        Language: 'language',
        Business: 'business',
        Management: 'management',
        'Personal & Development': 'personal_development',
        'Sales & Marketing': 'sales_marketing',
        'Engineering & Construction': 'engineer_construction',
        'Teaching & Academics': 'teaching_academics',
        Bestseller: 'bestseller',
    }

    const getLabelBkgColor = () => {
        return 'bg-' + bkg_code[props.name]
    }

    return (
        <div
            className={`text-[9px] rounded-[80px] px-2 py-1 w-fit text-white font-semibold ${getLabelBkgColor()} ${
                props.hidden && 'hidden'
            }`}
        >
            {props.name}
        </div>
    )
}
