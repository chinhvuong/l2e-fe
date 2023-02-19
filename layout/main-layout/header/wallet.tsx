import React, { useEffect } from 'react'
import './style.scss'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { ConnectWalletButton } from '@/wallet/ui'
import { getLoginState } from '@/store/user/selectors'
import Account from './account'
import { ACCESS_TOKEN } from '@/constants/localStorage'
import { updateLoginState } from '@/store/user'

export default function Wallet(props: any) {
    const loginState = useAppSelector(getLoginState)

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (localStorage.getItem(ACCESS_TOKEN)) {
            dispatch(updateLoginState(true))
        }
    }, [loginState])

    if (loginState) {
        return <Account darkTheme={props.darkTheme} />
    }
    return <ConnectWalletButton />
}
