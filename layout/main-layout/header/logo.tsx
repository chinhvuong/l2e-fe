import React, { HTMLAttributes } from 'react'
interface ILogo {
    darkTheme: boolean
    imgClass?: string
}

const Logo = ({
    darkTheme,
    imgClass,
    ...rest
}: ILogo & HTMLAttributes<HTMLDivElement>) => {
    return (
        <div className="cursor-pointer" {...rest}>
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
