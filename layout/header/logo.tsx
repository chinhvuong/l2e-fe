import React from 'react'
interface ILogo {
    darkTheme: boolean
}

const Logo = (props: ILogo) => {
    return props.darkTheme ? (
        <img src="/svgs/logos/logo_light.svg" alt="" />
    ) : (
        <img src="/svgs/logos/logo_dark.svg" alt="" />
    )
}

export default Logo
