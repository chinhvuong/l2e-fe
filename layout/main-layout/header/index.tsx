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
                <div className="px-14 flex flex-wrap justify-around items-center 2xl:justify-center 2xl:space-x-[35px] xl:space-x-[15px] under_xl:justify-between">
                    <Logo darkTheme={props.darkTheme} />
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
                    <Wallet darkTheme={props.darkTheme} />
                </div>
            </div>
        </>
    )
}

export default Header
