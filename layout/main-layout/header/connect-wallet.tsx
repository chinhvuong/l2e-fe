import React, { useEffect } from 'react'
import { eth } from '@/hooks/useEth' // Global state
import { useState } from 'react' // State management
import './style.scss'
import { useAuth } from '@/api/hooks/useAuth'
import { WALLET_ADDRESS } from '@/constants/localStorage'
import { SIGN_MESSAGE } from '@/constants'

export default function ConnectWallet() {
    // Global state
    const { address, unlock, signData } = eth.useContainer()
    // Action menu open state
    const [menuOpen, setMenuOpen] = useState<boolean>(false)

    const { useLogin } = useAuth()
    const { mutate: login } = useLogin({
        onError: () => {},
        onSuccess: () => {},
    })

    useEffect(() => {
        ;(async () => {
            if (address && address !== localStorage.getItem(WALLET_ADDRESS)) {
                localStorage.setItem(WALLET_ADDRESS, address)
                const signature = await signData(SIGN_MESSAGE)
                if (signature) {
                    login({
                        walletAddress: address,
                        signature: signature,
                    })
                } else {
                    console.log('signature fail')
                }
            }
        })()
    }, [address])

    return (
        <div className="bg-primary rounded-[80px] py-[12px] px-[30px] cursor-pointer">
            {/* Auth + details */}
            {/* Unlock button */}
            <button onClick={() => unlock()}>Connect Wallet</button>
        </div>
    )
}
