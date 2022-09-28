import { Category } from '@/interfaces'
import * as React from 'react'

export interface ILabelProps {
    type: Category | 'bestseller'
    hidden?: boolean
}

export default function Label(props: ILabelProps) {
    const title = {
        it: 'IT',
        health: 'Health',
        language: 'Language',
        business: 'Business',
        management: 'Management',
        personal_development: 'Personal & Development',
        sales_marketing: 'Sales & Marketing',
        engineer_construction: 'Engineering & Construction',
        teaching_academics: 'Teaching & Academics',
        bestseller: 'Bestseller',
    }

    const getLabelBkgColor = () => {
        return 'bg-' + props.type
    }

    return (
        <div
            className={`text-[9px] rounded-[80px] px-2 py-1 w-fit text-white font-bold ${getLabelBkgColor()} ${
                props.hidden ? 'hidden' : ''
            }`}
        >
            {title[props.type]}
        </div>
    )
}
