import type { Ethereum } from '@wagmi/core'
export enum ConnectorNames {
    MetaMask = 'metaMask',
    Injected = 'injected',
    WalletConnect = 'walletConnect',
    BSC = 'bsc',
    Blocto = 'blocto',
    WalletLink = 'coinbaseWallet',
}

export interface ExtendEthereum extends Ethereum {
    isSafePal?: true
    isCoin98?: true
    isBlocto?: true
    isMathWallet?: true
    isTrustWallet?: true
}

declare global {
    // interface Window {
    //     coin98?: true
    //     ethereum?: ExtendEthereum
    //     BinanceChain?: {
    //         bnbSign?: (address: string, message: string) => Promise<{ publicKey: string; signature: string }>
    //         switchNetwork?: (networkId: string) => Promise<string>
    //     } & Ethereum
    // }
}

type LinkOfTextAndLink = string

type DeviceLink = {
    desktop?: LinkOfTextAndLink
    mobile?: LinkOfTextAndLink
}

type LinkOfDevice = string | DeviceLink

export type WalletConfigV2<T = unknown> = {
    id: string
    title: string
    icon: string
    connectorId: T
    deepLink?: string
    installed?: boolean
    guide?: LinkOfDevice
    downloadLink?: LinkOfDevice
    mobileOnly?: boolean
    qrCode?: () => Promise<string>
}

export class WalletConnectorNotFoundError extends Error {}

export class WalletSwitchChainError extends Error {}
