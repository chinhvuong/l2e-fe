import React, { HtmlHTMLAttributes, useEffect, useState } from 'react'
import useWeb3 from '../hooks/useWeb3'

const WalletAccount = ({ ...rest }: HtmlHTMLAttributes<HTMLDivElement>) => {
    const { address, chain, chains } = useWeb3()

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
