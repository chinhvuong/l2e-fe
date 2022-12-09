import React, { ReactNode } from 'react'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
// import { client } from './utils'
import { goerli } from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'
// import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'

const { chains, provider, webSocketProvider } = configureChains(
    [goerli],
    [
        alchemyProvider({ apiKey: 'wn-Jl6QMjs4Pq80s7AvkhsnuIicQLMn2' }),
        // infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_API_KEY! }),
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
