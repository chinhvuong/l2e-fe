import React, { HtmlHTMLAttributes, useEffect, useState } from 'react'
import useWeb3 from '../hooks/useWeb3'
// import { isChainSupported } from '../utils'

const WalletAccount = ({ ...rest }: HtmlHTMLAttributes<HTMLDivElement>) => {
    const { address, chain, chains } = useWeb3()
    // const [openSwitchNetworkModal, setOpenSwitchNetworkModal] = useState(false)

    // useEffect(() => {
    //     console.log(chain && !isChainSupported(chain.id))
    //     if (chain && !isChainSupported(chain.id)) {
    //         setOpenSwitchNetworkModal(true)
    //     } else if (chain && openSwitchNetworkModal) {
    //         setOpenSwitchNetworkModal(false)
    //     }
    // }, [chain, chains])

    return (
        <>
            <div
                className="bg-primary rounded-[80px] py-[12px] px-[30px] cursor-pointer"
                {...rest}
            >
                {address ? (
                    <div>
                        {address?.slice(0, 4)}...
                        {address?.slice(address.length - 4)}
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </>
    )
}

export default WalletAccount
