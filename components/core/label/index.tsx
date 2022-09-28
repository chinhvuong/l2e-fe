import { Category } from '@/interfaces'
import * as React from 'react'

export interface ILabelProps {
    type: Category | 'bestseller'
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
    //${props.type}
    return (
        <div
            className={`rounded-[80px] px-4 py-2 w-fit text-white font-bold bg-${props.type}`}
        >
            {title[props.type]}
        </div>
    )
}
