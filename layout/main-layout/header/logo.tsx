import Router from 'next/router'
import React, { HTMLAttributes } from 'react'
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
            className={`cursor-pointer ${className}`}
            {...rest}
            onClick={() => goToHomePage()}
        >
            {darkTheme ? (
                <img
                    src="/svgs/logos/logo_light.svg"
                    alt=""
                    className={`${imgClass}`}
                />
            ) : (
                <img
                    src="/svgs/logos/logo_dark.svg"
                    alt=""
                    className={`${imgClass}`}
                />
            )}
        </div>
    )
}

export default Logo
