import React from 'react'
import './style.scss'
import { useAppSelector } from '@/hooks'
import { ConnectWalletButton } from '@/wallet/ui'
import { getLoginState } from '@/store/user/selectors'
import Account from './account'

export default function Wallet(props: any) {
    const loginState = useAppSelector(getLoginState)

    if (loginState) {
        return <Account darkTheme={props.darkTheme} />
    }
    return <ConnectWalletButton />
}
