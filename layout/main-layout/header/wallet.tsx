import React, { useEffect } from 'react'
import './style.scss'
import { useAuth } from '@/api/hooks/useAuth'
import { SIGN_MESSAGE } from '@/constants'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { updateAssetState, updateLoginState } from '@/store/user'
import { ConnectWalletButton } from '@/wallet/ui'
import useWeb3 from '@/wallet/hooks/useWeb3'
import { useContractRead, useSignMessage } from 'wagmi'
import { getLoginState } from '@/store/user/selectors'
import Account from './account'
// import { usdtAbi } from '@/abi/usdt'

export default function Wallet(props: any) {
    // const { isConnected } = useWeb3()
    const loginState = useAppSelector(getLoginState)
    // const { data, isSuccess, signMessage } = useSignMessage({
    //     message: SIGN_MESSAGE,
    // })
    // const { data: balance, } = useContractRead({
    //     address: process.env.NEXT_PUBLIC_USDT_CONTRACT,
    //     abi: usdtAbi,
    //     functionName: 'balanceOf',
    //     chainId: 5,
    //     args: [address]
    // })

    // const { data: approve, } = useContractRead({
    //     address: process.env.NEXT_PUBLIC_USDT_CONTRACT,
    //     abi: usdtAbi,
    //     functionName: 'allowance',
    //     chainId: 5,
    //     args: [address, process.env.NEXT_PUBLIC_COURSEDEX_CONTRACT]
    // })

    // const { useLogin } = useAuth()
    // const { mutate: login } = useLogin({
    //     onError: () => {},
    //     onSuccess: () => {
    //         dispatch(updateLoginState(true))
    //     },
    // })

    // const dispatch = useAppDispatch()

    // useEffect(() => {
    //     if (address && isConnected && !loginState) {
    //         signMessage()
    //         // dispatch(updateLoginState(true))
    //     } else {
    //         if (!isConnected && loginState) {
    //             dispatch(updateLoginState(false))
    //         }
    //     }
    // }, [loginState, isConnected])

    // useEffect(() => {
    //     if (isSuccess) {
    //         console.log(data)
    //         login({
    //             walletAddress: String(address),
    //             signature: String(data),
    //         })
    //     }
    // }, [isSuccess])

    // useEffect(() => {
    //     if (address) {
    //         (async () => {
    //             dispatch(updateAssetState({
    //                 approve: Number(approve),
    //                 balance: Number(balance),
    //             }))
    //         })()

    //     }
    // }, [address])

    if (loginState) {
        return <Account darkTheme={props.darkTheme} />
    }
    return <ConnectWalletButton />
}
