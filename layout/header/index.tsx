import React from 'react'
import Explore from './explore'
import Logo from './logo'
import Search from './search'
import './style.scss'
import Button from '@/components/core/button'

const Header = () => {
    return (
        <div className="bg-second py-6 header--dark">
            <div className="px-14 flex justify-between items-center">
                <Logo />
                <Search />
                <Explore />
                <div className="cursor-pointer hover:text-primary-hover">
                    For Business
                </div>
                <div className="cursor-pointer hover:text-primary-hover">
                    For Universities
                </div>
                <Button className="btn-primary">Connect Wallet</Button>
            </div>
        </div>
    )
}

export default Header
