import React from 'react'
import Explore from './explore'
import Logo from './logo'
import Search from './search'
import './style.scss'
import Button from '@/components/core/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faBell, faWallet } from '@fortawesome/free-solid-svg-icons'
import Router from 'next/router'

interface IHeader {
    darkTheme: boolean
    isLoggedIn: boolean
}

const Header = (props: IHeader) => {
    const goToHomePage = () => {
        Router.push('/')
    }

    const goToAboutUsPage = () => {
        Router.push('/about-us')
    }

    return (
        <div
            className={`py-8 ${props.darkTheme ? 'text-white' : 'text-black'} ${
                props.darkTheme ? 'bg-second' : 'bg-white'
            }`}
        >
            <div className="px-14 flex flex-wrap justify-around items-center 2xl:justify-center 2xl:space-x-[35px] xl:space-x-[15px] under_xl:justify-between">
                <FontAwesomeIcon
                    icon={faBars}
                    className={`hidden text-[25px] under_xl:block lg:mr-[100px] md:mr-[100px] sm:mr-[0px] cursor-pointer ${
                        props.darkTheme ? 'text-white' : 'text-black'
                    }`}
                />
                <Logo
                    darkTheme={props.darkTheme}
                    onClick={() => goToHomePage()}
                />
                <Search darkTheme={props.darkTheme} />
                <Explore />
                <div className="cursor-pointer hover:text-primary-hover under_xl:hidden">
                    Careers
                </div>
                <div
                    className="cursor-pointer hover:text-primary-hover under_xl:hidden"
                    onClick={() => goToAboutUsPage()}
                >
                    About Us
                </div>
                <FontAwesomeIcon
                    icon={faBars}
                    className={`hidden text-[25px] under_lg:block under_lg:mr-[0px] md:ml-[100px] ${
                        !props.darkTheme ? 'text-white' : 'text-black'
                    }`}
                />
                {!props.isLoggedIn ? (
                    <Button className="btn-primary under_lg:hidden">
                        Connect Wallet
                    </Button>
                ) : (
                    <div className="flex items-center justify-between sm:hidden lg:w-[150px] under_lg:hidden">
                        <FontAwesomeIcon
                            icon={faBell}
                            className={`text-[25px] cursor-pointer ${
                                !props.darkTheme ? 'text-black' : 'text-white'
                            }`}
                        />
                        <img
                            src="https://cdn.wallpapersafari.com/21/24/pELVjk.jpg"
                            alt=""
                            className="rounded-full h-[35px] w-[35px] 2xl:mx-[35px] xl:mx-[15px] cursor-pointer"
                        />
                        <FontAwesomeIcon
                            icon={faWallet}
                            className={`text-[25px] cursor-pointer ${
                                !props.darkTheme ? 'text-black' : 'text-white'
                            }`}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default Header
