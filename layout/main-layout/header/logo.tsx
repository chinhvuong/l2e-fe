import Router from 'next/router'
import React, { HTMLAttributes, useEffect, useState } from 'react'
interface ILogo {
    darkTheme: boolean
    imgClass?: string
    className?: string
}

const Logo = ({
    darkTheme,
    imgClass,
    className,
    ...rest
}: ILogo & HTMLAttributes<HTMLDivElement>) => {
    const goToHomePage = () => {
        Router.push('/')
    }
    return (
        <div
            className={`cursor-pointer ${className} under_xl:w-12`}
            {...rest}
            onClick={() => goToHomePage()}
        >
            <img
                src={`/svgs/logos/logo_${darkTheme ? 'light' : 'dark'}.svg`}
                alt=""
                className={`${imgClass} block under_xl:hidden`}
            />
            <img
                src={`/svgs/logos/logo_icon_${
                    darkTheme ? 'light' : 'dark'
                }.svg`}
                alt=""
                className={`${imgClass} hidden under_xl:block`}
            />
        </div>
    )
}

export default Logo
