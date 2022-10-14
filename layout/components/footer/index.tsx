import React from 'react'
import './styles.scss'
import Company from './company'
const Footer = () => {
    return (
        <div className="space-y-10">
            <Company />
            <div className="bg-second h-[300px]"></div>
        </div>
    )
}

export default Footer
