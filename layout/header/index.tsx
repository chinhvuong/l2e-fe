import React from 'react'
import Logo from './logo'
import Notification from './notification'
import ToggleLocale from './toggle-locale'
import User from './user'

const Header = () => {
    return (
        <div className="bg-gradient py-6 md:py-4">
            <div className="limit my-auto flex justify-between">
                <Logo />
                <div className="flex gap-4 items-center">
                    <Notification />
                    <ToggleLocale />
                    <span className="text-white">|</span>
                    <User />
                </div>
            </div>
        </div>
    )
}

export default Header
