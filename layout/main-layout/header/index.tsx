import Explore from './explore'
import Logo from './logo'
import Search from './search'
import './style.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import Router from 'next/router'
import Wallet from './wallet'
import { useState } from 'react'
import LoadingScreen from '@/components/core/animate/loading-screen'

interface IHeader {
    darkTheme: boolean
}

const Header = (props: IHeader) => {
    const [isNavigate, setIsNavigate] = useState<boolean>(false)

    const goToHomePage = () => {
        setIsNavigate(true)
        Router.push('/')
    }

    const goToAboutUsPage = () => {
        setIsNavigate(true)
        Router.push('/about-us')
    }

    return (
        <>
            <LoadingScreen isLoading={isNavigate} />
            <div
                className={`py-8 ${
                    props.darkTheme ? 'text-white' : 'text-black'
                } ${props.darkTheme ? 'bg-second' : 'bg-white'}`}
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
                    <Wallet darkTheme={props.darkTheme} />
                </div>
            </div>
        </>
    )
}

export default Header
