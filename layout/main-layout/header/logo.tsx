import React, { HTMLAttributes } from 'react'
interface ILogo {
    darkTheme: boolean
}

const Logo = ({
    darkTheme,
    ...rest
}: ILogo & HTMLAttributes<HTMLDivElement>) => {
    return (
        <div className="cursor-pointer" {...rest}>
            {darkTheme ? (
                <img src="/svgs/logos/logo_light.svg" alt="" />
            ) : (
                <img src="/svgs/logos/logo_dark.svg" alt="" />
            )}
        </div>
    )
}

export default Logo
