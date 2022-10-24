import React, { useEffect } from 'react'
import Link from 'next/link' // Dynamic routing
import { eth } from '@/hooks/useEth' // Global state
import { useState } from 'react' // State management
import './style.scss'
import { useAppDispatch } from '@/hooks'
import { setWalletAddress } from '@/store/user'
import { useAuth } from '@/api/hooks/useAuth'
export default function ConnectWallet() {
    // Global state
    const { address, unlock }: { address: string | null; unlock: Function } =
        eth.useContainer()
    // Action menu open state
    const [menuOpen, setMenuOpen] = useState<boolean>(false)
    const dispatch = useAppDispatch()

    const { useLogin } = useAuth()
    const { mutate: login } = useLogin({
        onError: () => {},
        onSuccess: (response) => {
            console.log('onSuccess', response)
        },
    })

    useEffect(() => {
        if (address) {
            dispatch(setWalletAddress(address))
            login({
                walletAddress: '0x6AB0Cc7184F27b7ABbA97de7d23B26665a4f7d5C',
                signature:
                    '0x3282ea2682c68be7183248f61298b9993962ca41aadec42e0bb1944057ed66750a53aad0b8bf4923671d89a9d40b70e31244e448b35f1dd0c4d88106772275011b',
            })

            console.log(address)
        }
    }, [address])

    return (
        <div className="bg-primary rounded-[80px] py-[12px] px-[30px] cursor-pointer">
            {/* Auth + details */}
            {/* Unlock button */}
            <button onClick={() => unlock()}>Connect Wallet</button>
        </div>
    )
}
