import Logo from '@/layout/main-layout/header/logo'
import Router from 'next/router'
import React from 'react'

const Footer = () => {
    const goToHomePage = () => {
        Router.push('/')
    }

    const goToAboutUsPage = () => {
        Router.push('/about-us')
    }

    return (
        <div className="space-y-10">
            <div className="mt-10 mx-10 xl:mx-[150px] md:mx-[10px] sm:mx-[50px]">
                <div className="text-center text-description font-medium text-lg py-10">
                    Trusted by 5,000+ Companies Worldwide
                </div>
                <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-10">
                    <img src="/svgs/logos/google-logo.svg" alt="google-logo" />
                    <img
                        src="/svgs/logos/netflix-logo.svg"
                        alt="netflix-logo"
                    />
                    <img src="/svgs/logos/airbnb-logo.svg" alt="airbnb-logo" />
                    <img src="/svgs/logos/amazon-logo.svg" alt="amazon-logo" />
                    <img
                        src="/svgs/logos/facebook-logo.svg"
                        alt="facebook-logo"
                    />
                    <img src="/svgs/logos/grab-logo.svg" alt="grab-logo" />
                </div>
            </div>
            <div className="bg-second h-[300px] py-10 px-5">
                <div className="flex flex-col items-center space-y-5">
                    <Logo
                        darkTheme={true}
                        onClick={() => goToHomePage()}
                        className="cursor-pointer"
                    />
                    <div className="flex space-x-8">
                        <img
                            src="/svgs/logos/facebook-icon.svg"
                            alt="facebook-icon"
                            className="w-8 cursor-pointer"
                        />
                        <img
                            src="/svgs/logos/twitter-icon.svg"
                            alt="twitter-icon"
                            className="w-8 cursor-pointer"
                        />
                        <img
                            src="/svgs/logos/instagram-icon.svg"
                            alt="instagram-icon"
                            className="w-8 cursor-pointer"
                        />
                        <img
                            src="/svgs/logos/youtube-icon.svg"
                            alt="youtube-icon"
                            className="w-8 cursor-pointer"
                        />
                    </div>
                    <div className="flex space-x-5 text-white font-semibold pt-2">
                        <div
                            className="cursor-pointer hover:text-primary"
                            onClick={() => goToHomePage()}
                        >
                            Home
                        </div>
                        <div
                            className="cursor-pointer hover:text-primary"
                            onClick={() => goToAboutUsPage()}
                        >
                            About us
                        </div>
                        <div className="cursor-pointer hover:text-primary">
                            Terms of Use
                        </div>
                        <div className="cursor-pointer hover:text-primary">
                            Privacy Policy
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
