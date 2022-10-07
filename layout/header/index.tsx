import React from 'react'
import Explore from './explore'
import Logo from './logo'
import Search from './search'
import './style.scss'
import Button from '@/components/core/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import Router from 'next/router'

interface IHeader {
    darkTheme: boolean
}

const Header = (props: IHeader) => {
    const goToHomePage = () => {
        Router.push('/')
    }
    return (
        <div
            className={`py-8 ${props.darkTheme ? 'text-white' : 'text-black'} ${
                props.darkTheme ? 'bg-second' : 'bg-white'
            }`}
        >
            <div className="px-14 flex flex-wrap justify-between items-center 2xl:justify-center 2xl:space-x-[35px]">
                <FontAwesomeIcon
                    icon={faBars}
                    className="hidden text-white text-[25px] under_xl:block lg:mr-[100px] md:mr-[100px] sm:mr-[0px] cursor-pointer"
                />
                <Logo
                    darkTheme={props.darkTheme}
                    onClick={() => goToHomePage()}
                />
                <Search darkTheme={props.darkTheme} />
                <Explore />
                <div className="cursor-pointer hover:text-primary-hover under_xl:hidden">
                    For Business
                </div>
                <div className="cursor-pointer hover:text-primary-hover under_xl:hidden">
                    For Universities
                </div>
                <FontAwesomeIcon
                    icon={faBars}
                    className="hidden text-second text-[25px] sm:block sm:mr-[0px]"
                />
                <Button className="btn-primary sm:hidden">
                    Connect Wallet
                </Button>
            </div>
        </div>
    )
}

export default Header
