import React, { ReactNode } from 'react'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { goerli } from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'

const { chains, provider, webSocketProvider } = configureChains(
    [goerli],
    [
        alchemyProvider({ apiKey: 'wn-Jl6QMjs4Pq80s7AvkhsnuIicQLMn2' }),
        publicProvider(),
    ],
    { targetQuorum: 1 },
)

const client = createClient({
    autoConnect: true,
    connectors: [
        new MetaMaskConnector({
            chains,
            options: {
                UNSTABLE_shimOnConnectSelectAccount: true,
            },
        }),
    ],
    provider,
    webSocketProvider,
})

const WagmiProvider = ({ children }: { children: ReactNode }) => {
    return <WagmiConfig client={client}>{children}</WagmiConfig>
}

export default WagmiProvider
