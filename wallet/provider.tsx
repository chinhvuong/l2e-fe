import React, { ReactNode } from 'react'
import { WagmiConfig } from 'wagmi'
import { client } from './utils'

const WagmiProvider = ({ children }: { children: ReactNode }) => {
    return <WagmiConfig client={client}>{children}</WagmiConfig>
}

export default WagmiProvider
