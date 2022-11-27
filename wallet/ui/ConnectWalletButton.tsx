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

const ConnectWalletButton = () => {
    const { connect, chain, connectAsync } = useWeb3()
    const [open, setOpen] = useState(false)
    const [error, setError] = useState('')
    const wallets = useMemo(
        () => createWallets(chain?.id || 1, connectAsync),
        [chain, connectAsync],
    )
    const { isMobile } = useMobileDetect()

    const connectWallet = (wallet: WalletConfigV2<ConnectorNames>) => {
        setError('')
        if (wallet.installed !== false) {
            connect(wallet.connectorId)
                .then((v: any) => {
                    if (v) {
                        localStorage.setItem('wallet', wallet.title)
                        setOpen(false)
                    }
                })
                .catch((err: any) => {
                    if (err instanceof WalletConnectorNotFoundError) {
                        setError('CONNECT_WALLET_NOT_FOUND_PROVIDER_ERROR')
                    } else if (err instanceof WalletSwitchChainError) {
                        setError(err.message)
                    } else {
                        setError('CONNECT_WALLET_UNKNOWN_ERROR')
                    }
                })
        } else if (wallet.downloadLink !== undefined) {
            if (typeof wallet.downloadLink === 'string') {
                window.open(wallet.downloadLink)
            } else {
                if (isMobile()) {
                    window.open(wallet.downloadLink?.mobile)
                } else {
                    window.open(wallet.downloadLink?.desktop)
                }
            }
        }
    }
    return (
        <>
            <button
                className="bg-primary rounded-[80px] py-[12px] px-[30px] cursor-pointer"
                onClick={() => connectWallet(wallets[0])}
            >
                Connect Wallet
            </button>
            {/* <StyledModal
                // title="Modal 1000px width"
                centered
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                width={600}
                footer={null}
                mask={true}
                closable={false}
            >
                <div className="connect-wallet-modal-container">
                    <WalletWraper>
                        <h2 className="connect-wallet-modal-heading">
                            Connect Wallet
                        </h2>
                        <WalletOptions>
                            {wallets.map((wallet) => (
                                <WalletButton
                                    key={wallet.connectorId}
                                    onClick={() => connectWallet(wallet)}
                                >
                                    <img src={wallet.icon} />
                                    <span>{wallet.title}</span>
                                </WalletButton>
                            ))}
                        </WalletOptions>
                    </WalletWraper>
                    <Guide />
                </div>
            </StyledModal> */}
        </>
    )
}

export default ConnectWalletButton
