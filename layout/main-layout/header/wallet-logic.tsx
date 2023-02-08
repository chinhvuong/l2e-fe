import React, { useEffect, useState } from 'react'
import './style.scss'
import { SIGN_MESSAGE } from '@/constants'
import { useAppDispatch } from '@/hooks'
import { updateAssetState, updateLoginState } from '@/store/user'
import { useAccount, useContractRead, useSignMessage } from 'wagmi'
import { getLoginState } from '@/store/user/selectors'
import { usdtAbi } from '@/abi/usdt'
import { useSelector } from 'react-redux'
import { verifyMessage } from 'ethers/lib/utils'
import useAPI from '@/api/hooks/useAPI'
import { AuthAPI } from '@/api/api-path'
import { noop } from 'lodash'
import { AuthResponse } from '@/api/dto/auth.dto'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants/localStorage'
export default function WalletLogic() {
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
        enabled: Boolean(address),
    })

    const dispatch = useAppDispatch()
    const { mutate: login } = useAPI.post(AuthAPI.LOGIN, {
        onError: noop,
        onSuccess: (response: AuthResponse) => {
            if (response) {
                localStorage.setItem(ACCESS_TOKEN, response.accessToken)
                localStorage.setItem(REFRESH_TOKEN, response.refreshToken)
                dispatch(updateLoginState(true))
            }
        },
    })

    useEffect(() => {
        console.log(balance, approve)
        const asset: any = {}
        if (balance) {
            asset.balance = Number(balance)
        }
        if (approve) {
            asset.approve = Number(approve)
        }
        dispatch(updateAssetState(asset))
    }, [balance, approve])

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
        },
    })

    const account = useAccount({
        onConnect: (data) => {
            if (!loginState && !data.isReconnected) {
                signMessage?.signMessage &&
                    signMessage.signMessage({ message: String(SIGN_MESSAGE) })
            }
            if (data.address !== address) {
                setAddress(data.address)
                refetchBalance()
                refetchAllowance()
            }
        },
        onDisconnect: () => {},
    })

    // const ensAvatar = useEnsAvatar({
    //     address: account?.address,
    //     // chainId: 1,
    // })
    // const ensName = useEnsName({ address: account?.address, chainId:  })
    // const disconnect = useDisconnect()

    return <div></div>
}
