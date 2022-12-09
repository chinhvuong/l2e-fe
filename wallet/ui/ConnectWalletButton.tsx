import React, { useMemo, useState } from 'react'
import { createWallets } from '../config'
import {
    ConnectorNames,
    WalletConfigV2,
    WalletConnectorNotFoundError,
    WalletSwitchChainError,
} from '../types'
import useMobileDetect from '@/hooks/useMobileDetect'
import useWeb3 from '../hooks/useWeb3'
import { useAccount, useConnect } from 'wagmi'

const ConnectWalletButton = () => {
    // const { connect, chain, connectAsync } = useWeb3()
    const [open, setOpen] = useState(false)
    const [error, setError] = useState('')
    // const wallets = useMemo(
    //     () => createWallets(chain?.id || 1, connectAsync),
    //     [chain, connectAsync],
    // )
    const { isMobile } = useMobileDetect()

    const { connector, isReconnecting } = useAccount()
    const { connect, connectors, isLoading, pendingConnector } = useConnect()
    // const connectWallet = (wallet: WalletConfigV2<ConnectorNames>) => {
    //     setError('')
    //     if (wallet.installed !== false) {
    //         connect(wallet.connectorId)
    //             .then((v: any) => {
    //                 if (v) {
    //                     localStorage.setItem('wallet', wallet.title)
    //                     setOpen(false)
    //                 }
    //             })
    //             .catch((err: any) => {
    //                 if (err instanceof WalletConnectorNotFoundError) {
    //                     setError('CONNECT_WALLET_NOT_FOUND_PROVIDER_ERROR')
    //                 } else if (err instanceof WalletSwitchChainError) {
    //                     setError(err.message)
    //                 } else {
    //                     setError('CONNECT_WALLET_UNKNOWN_ERROR')
    //                 }
    //             })
    //     } else if (wallet.downloadLink !== undefined) {
    //         if (typeof wallet.downloadLink === 'string') {
    //             window.open(wallet.downloadLink)
    //         } else {
    //             if (isMobile()) {
    //                 window.open(wallet.downloadLink?.mobile)
    //             } else {
    //                 window.open(wallet.downloadLink?.desktop)
    //             }
    //         }
    //     }
    // }

    return (
        <>
            {connectors.map((x) => (
                <button
                    // disabled={!x.ready || isReconnecting || connector?.id === x.id}
                    key={x.name}
                    className="bg-primary rounded-[80px] py-[12px] px-[30px] cursor-pointer"
                    onClick={() => connect({ connector: x })}
                >
                    Connect Wallet
                    {isLoading && x.id === pendingConnector?.id && ' …'}
                </button>
            ))}
            {/* </div>
            // <button
            //     disabled={!connectors[0].ready || isReconnecting}
            //     className="bg-primary rounded-[80px] py-[12px] px-[30px] cursor-pointer"
            //     onClick={() => connect({ connector: connectors[0] })}
            // >
            //     Connect Wallet
            // </button> */}
        </>
    )
}

export default ConnectWalletButton
