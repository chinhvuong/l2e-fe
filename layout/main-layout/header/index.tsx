import { useState } from 'react'
import Explore from './explore'
import Logo from './logo'
import Search from './search'
import './style.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faBars,
    faBell,
    faWallet,
    faUser,
    faGear,
    faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons'
import Router from 'next/router'
import ConnectWallet from './connect-wallet'
import { getLoginState } from '@/store/user/selectors'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { updateLoginState } from '@/store/user'

interface IHeader {
    darkTheme: boolean
}

const Header = (props: IHeader) => {
    const [hoverUser, setHoverUser] = useState(false)
    const [hoverUserActions, setHoverUserActions] = useState(false)

    const isLogin = useAppSelector(getLoginState)
    const dispatch = useAppDispatch()

    const goToHomePage = () => {
        Router.push('/')
    }

    const goToAboutUsPage = () => {
        Router.push('/about-us')
    }

    const logOut = () => {
        dispatch(updateLoginState(false))
        localStorage.clear()
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
                {!isLogin ? (
                    <ConnectWallet />
                ) : (
                    <div className="flex items-center justify-between sm:hidden lg:w-[150px] under_lg:hidden">
                        <FontAwesomeIcon
                            icon={faBell}
                            className={`text-[25px] cursor-pointer ${
                                !props.darkTheme ? 'text-black' : 'text-white'
                            }`}
                        />
                        <div className="relative">
                            <img
                                src="https://cdn.wallpapersafari.com/21/24/pELVjk.jpg"
                                alt=""
                                className="rounded-full h-[35px] w-[35px] mx-[35px] cursor-pointer"
                                onMouseEnter={() => setHoverUser(true)}
                                onMouseLeave={() => setHoverUser(false)}
                            />
                            <div
                                onMouseEnter={() => setHoverUserActions(true)}
                                onMouseLeave={() => setHoverUserActions(false)}
                                className={`w-[150px] absolute right-[20px] z-30 w-full ${
                                    !(hoverUser || hoverUserActions) && 'hidden'
                                }`}
                            >
                                <div className="h-[15px]"></div>
                                <div
                                    className={`rounded-[20px] bg-white drop-shadow-lg w-full `}
                                >
                                    <div
                                        className="flex items-center space-x-3 hover:bg-primary hover:text-white text-black box-border px-[20px] py-3 rounded-t-[20px] cursor-pointer"
                                        // onClick={() => onSelectRating(item)}
                                    >
                                        <FontAwesomeIcon
                                            icon={faUser}
                                            className="w-[16px]"
                                        />
                                        <div>Profile</div>
                                    </div>
                                    <div
                                        className="flex items-center space-x-3 hover:bg-primary hover:text-white text-black box-border px-[20px] py-3 cursor-pointer"
                                        // onClick={() => onSelectRating(item)}
                                    >
                                        <FontAwesomeIcon
                                            icon={faGear}
                                            className="w-[16px]"
                                        />
                                        <div>Settings</div>
                                    </div>
                                    <div
                                        className="flex items-center space-x-3 hover:bg-primary hover:text-white text-black box-border px-[20px] py-3 rounded-b-[20px] cursor-pointer"
                                        onClick={() => logOut()}
                                    >
                                        <FontAwesomeIcon
                                            icon={faRightFromBracket}
                                            className="ml-[1px]"
                                        />
                                        <div>Log Out</div>
                                    </div>
                                </div>
                            </div>
                        </div>
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
