import React, { useEffect, useState } from 'react'
import './style.scss'
import { useAuth } from '@/api/hooks/useAuth'
import { SIGN_MESSAGE } from '@/constants'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { updateAssetState, updateLoginState } from '@/store/user'
import useWeb3 from '@/wallet/hooks/useWeb3'
import { useAccount, useContractRead, useDisconnect, useEnsAvatar, useEnsName, useSignMessage } from 'wagmi'
import { getLoginState } from '@/store/user/selectors'
import { usdtAbi } from '@/abi/usdt'
import { useSelector } from 'react-redux'
import { verifyMessage } from 'ethers/lib/utils'
export default function WalletLogic() {
    // const { address, isConnected } = useWeb3()
    // const loginState = useAppSelector(getLoginState)
    // const { data, isSuccess, signMessage } = useSignMessage()
    const [address, setAddress] = useState<string | undefined>(undefined)

    const { data: balance, refetch: refetchBalance } = useContractRead({
        address: process.env.NEXT_PUBLIC_USDT_CONTRACT,
        abi: usdtAbi,
        functionName: 'balanceOf',
        chainId: 5,
        args: [address],
        enabled: Boolean(address),
    })

    const { data: approve, refetch: refetchAllowance } = useContractRead({
        address: process.env.NEXT_PUBLIC_USDT_CONTRACT,
        abi: usdtAbi,
        functionName: 'allowance',
        chainId: 5,
        args: [address, process.env.NEXT_PUBLIC_COURSEDEX_CONTRACT],
        enabled: Boolean(address)
    })

    const dispatch = useAppDispatch()
    const { useLogin } = useAuth()
    const { mutate: login } = useLogin({
        onError: () => {},
        onSuccess: () => {
            dispatch(updateLoginState(true))
        },
    })
    useEffect(() => {
        console.log(balance, approve);
        const asset: any = {}
        if (balance) {
            asset.balance = Number(balance)
        }
        if (approve) {
            asset.approve = Number(approve)
        }
        dispatch(updateAssetState(asset))
    }, [
        balance, approve
    ])



    // useEffect(() => {
    //     if (address && isConnected && !loginState) {
    //         signMessage({
    //             message: String(SIGN_MESSAGE),
    //         })
    //         // dispatch(updateLoginState(true))/
    //     } else {
    //         if (!isConnected && loginState) {
    //             dispatch(updateLoginState(false))
    //         }
    //     }
    // }, [loginState, address])

    // useEffect(() => {
    //     if (isSuccess) {
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
    const loginState = useSelector(getLoginState)


    const signMessage = useSignMessage({
        onSuccess: (data, variables) => {
            const address = verifyMessage(variables.message, data)
            login({
                walletAddress: address,
                signature: String(data),
            })
            dispatch(updateLoginState(true))
        }
    })

    const account = useAccount({
        onConnect: (data) => {
            if (!loginState && !data.isReconnected) {
                signMessage.signMessage({ message: String(SIGN_MESSAGE) })
            }
            if (data.address !== address) {
                setAddress(data.address)
                refetchBalance()
                refetchAllowance()
            }
        },
        onDisconnect: () => {

        },
    })



    // const ensAvatar = useEnsAvatar({
    //     address: account?.address,
    //     // chainId: 1,
    // })
    // const ensName = useEnsName({ address: account?.address, chainId:  })
    // const disconnect = useDisconnect()


    return <div></div>
}
