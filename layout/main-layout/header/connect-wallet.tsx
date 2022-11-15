import React, { useEffect } from 'react'
import { eth } from '@/hooks/useEth' // Global state
import { useState } from 'react' // State management
import './style.scss'
import { useAuth } from '@/api/hooks/useAuth'
import { ACCESS_TOKEN, WALLET_ADDRESS } from '@/constants/localStorage'
import { SIGN_MESSAGE } from '@/constants'
import { useAppDispatch } from '@/hooks'
import { updateLoginState } from '@/store/user'

export default function ConnectWallet() {
    // Global state
    const { address, unlock, signData } = eth.useContainer()

    const dispatch = useAppDispatch()

    const { useLogin } = useAuth()
    const { mutate: login } = useLogin({
        onError: () => {},
        onSuccess: () => {
            dispatch(updateLoginState(true))
        },
    })

    const handleLogIn = async () => {
        if (address && address !== localStorage.getItem(WALLET_ADDRESS)) {
            const signature = await signData(SIGN_MESSAGE)
            if (signature) {
                localStorage.setItem(WALLET_ADDRESS, address)
                login({
                    walletAddress: address,
                    signature: signature,
                })
            } else {
                console.log('signature fail')
            }
        }
    }

    useEffect(() => {
        handleLogIn()
    }, [address])

    return (
        <div className="bg-primary rounded-[80px] py-[12px] px-[30px] cursor-pointer">
            {/* Auth + details */}
            {/* Unlock button */}
            <button onClick={() => unlock()}>Connect Wallet</button>
        </div>
    )
}
