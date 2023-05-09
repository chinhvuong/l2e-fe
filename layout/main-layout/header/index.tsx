import Logo from './logo'
import Search from './search'
import './style.scss'
import Wallet from './wallet'

interface IHeader {
    darkTheme: boolean
}

const Header = (props: IHeader) => {
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
                    <Wallet darkTheme={props.darkTheme} />
                </div>
            </div>
        </>
    )
}

export default Header
