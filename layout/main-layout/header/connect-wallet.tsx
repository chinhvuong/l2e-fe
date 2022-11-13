import React, { useEffect } from 'react'
import {
    useAccount,
    useConnect,
    useDisconnect,
    useEnsAvatar,
    useEnsName,
  } from 'wagmi'
import { useState } from 'react' // State management
import './style.scss'
import { useAuth } from '@/api/hooks/useAuth'
import { WALLET_ADDRESS } from '@/constants/localStorage'
import { SIGN_MESSAGE } from '@/constants'
import { useSignMessage } from 'wagmi'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
export default function ConnectWallet() {
    // Global state
    const { address, isConnected } = useAccount();
    // Action menu open state
    const [menuOpen, setMenuOpen] = useState<boolean>(false)

    const { useLogin } = useAuth()
    const { connect } = useConnect({
      connector: new MetaMaskConnector(),
    })
    const { mutate: login } = useLogin({
        onError: () => {},
        onSuccess: () => {},
    })

    return (
        <div className="bg-primary rounded-[80px] py-[12px] px-[30px] cursor-pointer">
            {/* Auth + details */}
            {/* Unlock button */}
        <button onClick={() => connect()}>Connect Wallet</button>
        </div>
    )
}
