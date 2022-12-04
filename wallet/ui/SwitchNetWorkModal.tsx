import React from 'react'
// import styled from 'styled-components'
import { getChainIcon } from '../config'
import useWeb3 from '../hooks/useWeb3'

// c
const SwitchNetWorkModal = (props: any) => {
    const { chain: currentChain, chains, switchNetwork } = useWeb3()

    return (
        <div {...props} footer={null} closable={false} centered>
            <h2 className="switch-network-heading">Switch network</h2>
            <div>
                {chains.map((chain: any) => (
                    <button
                        disabled={
                            !switchNetwork || chain.id === currentChain?.id
                        }
                        key={chain.id}
                        onClick={() => switchNetwork?.(chain.id)}
                    >
                        <img
                            src={getChainIcon(chain.id)}
                            draggable={false}
                            alt={'chain icon'}
                        />
                        <span>{chain.name}</span>
                    </button>
                ))}
            </div>
        </div>
    )
}
export default SwitchNetWorkModal
