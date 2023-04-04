import { useAppDispatch } from '@/hooks'
import { updateLoadingState } from '@/store/course'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Router from 'next/router'
import Explore from './explore'
import Logo from './logo'
import Search from './search'
import './style.scss'
import Wallet from './wallet'

interface IHeader {
    darkTheme: boolean
}

const Header = (props: IHeader) => {
    const dispatch = useAppDispatch()

    const goToAboutUsPage = () => {
        dispatch(updateLoadingState(true))
        Router.push('/about-us')
    }

    return (
        <>
            <div
                className={`py-8 ${
                    props.darkTheme ? 'text-white' : 'text-black'
                } ${props.darkTheme ? 'bg-second' : 'bg-white'}`}
            >
                <div className="px-14 flex flex-wrap items-center space-x-10 under_2xl:space-x-7">
                    <Logo darkTheme={props.darkTheme} />
                    <Search darkTheme={props.darkTheme} />
                    <Explore />
                    <div
                        className="cursor-pointer hover:text-primary-hover under_xl:hidden"
                        onClick={() => goToAboutUsPage()}
                    >
                        About Us
                    </div>
                    <Wallet darkTheme={props.darkTheme} />
                </div>
            </div>
            {/* <div className="absolute top-0 z-50 w-full h-full bg-white">
                123123123123123
            </div> */}
        </>
    )
}

export default Header
