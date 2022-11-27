import React, { useEffect } from 'react'
import './style.scss'
import { useAuth } from '@/api/hooks/useAuth'
import { SIGN_MESSAGE } from '@/constants'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { updateLoginState } from '@/store/user'
import { ConnectWalletButton } from '@/wallet/ui'
import useWeb3 from '@/wallet/hooks/useWeb3'
import { useSignMessage } from 'wagmi'
import { getLoginState } from '@/store/user/selectors'
import Account from './account'

export default function Wallet(props: any) {
    const { address } = useWeb3()
    const loginState = useAppSelector(getLoginState)
    const { data, isSuccess, signMessage } = useSignMessage({
        message: SIGN_MESSAGE,
    })
    const { useLogin } = useAuth()
    const { mutate: login } = useLogin({
        onError: () => {},
        onSuccess: () => {
            dispatch(updateLoginState(true))
        },
    })

    const dispatch = useAppDispatch()

    useEffect(() => {
        console.log(address, loginState)

        if (address && !loginState) {
            signMessage()
            dispatch(updateLoginState(true))
        } else {
            if (!address && loginState) {
                dispatch(updateLoginState(false))
            }
        }
    }, [loginState, address])

    useEffect(() => {
        if (isSuccess) {
            console.log(data)
            login({
                walletAddress: String(address),
                signature: String(data),
            })
        }
    }, [isSuccess])

    if (loginState) {
        return <Account darkTheme={props.darkTheme} />
    }
    return <ConnectWalletButton />
}
