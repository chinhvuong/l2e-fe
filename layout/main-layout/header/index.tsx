import { useAppDispatch } from '@/hooks'
import Logo from './logo'
import Search from './search'
import './style.scss'
import Wallet from './wallet'

interface IHeader {
    darkTheme: boolean
}

const Header = (props: IHeader) => {
    const dispatch = useAppDispatch()

    return (
        <>
            <div
                className={`py-8 ${
                    props.darkTheme ? 'text-white' : 'text-black'
                } ${props.darkTheme ? 'bg-second' : 'bg-white'}`}
            >
                <div className="px-14 flex flex-wrap items-center space-x-10">
                    <Logo darkTheme={props.darkTheme} />
                    <Search darkTheme={props.darkTheme} />
                    {/* <Explore />
                    <div
                        className="cursor-pointer hover:text-primary-hover under_xl:hidden"
                        onClick={() => goToAboutUsPage()}
                    >
                        About Us
                    </div> */}
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
