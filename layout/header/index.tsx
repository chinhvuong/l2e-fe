import React from 'react'
import Explore from './explore'
import Logo from './logo'
import Search from './search'
import './style.scss'
import Button from '@/components/core/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

const Header = () => {
    return (
        <div className="bg-second py-6 header--dark">
            <div className="px-14 flex flex-wrap justify-between items-center">
                <FontAwesomeIcon
                    icon={faBars}
                    className="hidden text-white text-[25px] under_lg:block lg:mr-[100px] md:mr-[100px] sm:mr-[0px] cursor-pointer"
                />
                <Logo />
                <Search />
                <Explore />
                <div className="cursor-pointer hover:text-primary-hover under_lg:hidden">
                    For Business
                </div>
                <div className="cursor-pointer hover:text-primary-hover under_lg:hidden">
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
