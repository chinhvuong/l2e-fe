import { useAppSelector } from '@/hooks'
import { getLoginState } from '@/store/user/selectors'
import { ConnectWalletButton } from '@/wallet/ui'
import Account from './account'
import './style.scss'

export default function Wallet(props: any) {
    const loginState = useAppSelector(getLoginState)

    if (loginState) {
        return <Account darkTheme={props.darkTheme} />
    }
    return <ConnectWalletButton />
}
