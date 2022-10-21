import React from 'react'
import Link from 'next/link' // Dynamic routing
import { eth } from 'state/eth' // Global state
import { useState } from 'react' // State management
import './style.scss'
export default function ConnectWallet() {
    // Global state
    const { address, unlock }: { address: string | null; unlock: Function } =
        eth.useContainer()
    // Action menu open state
    const [menuOpen, setMenuOpen] = useState<boolean>(false)
    return (
        <div className="bg-primary rounded-[80px] py-[12px] px-[30px] cursor-pointer">
            {/* Auth + details */}
            {/* Unlock button */}
            <button onClick={() => unlock()}>
                {!address
                    ? // If not connected, render connect wallet
                      'Connect Wallet'
                    : // Else, render address
                      `${address.substr(0, 6)}...
                      ${address.slice(address.length - 4)}`}
            </button>
        </div>
    )
}
