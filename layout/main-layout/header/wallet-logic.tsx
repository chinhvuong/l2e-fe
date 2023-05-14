import { usdtAbi } from '@/abi/usdt'
import { AuthAPI } from '@/api/api-path'
import { AuthResponse } from '@/api/dto/auth.dto'
import useAPI from '@/api/hooks/useAPI'
import { SIGN_MESSAGE } from '@/constants'
import {
    ACCESS_TOKEN,
    RECONNECT_WALLET,
    REFRESH_TOKEN,
} from '@/constants/localStorage'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { updateAssetState, updateLoginState } from '@/store/user'
import { getLoginState } from '@/store/user/selectors'
import { verifyMessage } from 'ethers/lib/utils'
import { noop } from 'lodash'
import { useEffect, useState } from 'react'
import {
    useAccount,
    useContractRead,
    useSignMessage,
    useDisconnect,
} from 'wagmi'
import './style.scss'
export default function WalletLogic() {
    const { disconnect } = useDisconnect()
    const [address, setAddress] = useState<string | undefined>(undefined)
    const [reConnect, setReConnect] = useState(false)
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
        const asset: any = {}
        if (balance) {
            asset.balance = Number(balance)
        }
        if (approve) {
            asset.approve = Number(approve)
        }
        if (localStorage.getItem(RECONNECT_WALLET) === 'SUCCESS') {
            localStorage.removeItem(RECONNECT_WALLET)
            signMessage?.signMessage &&
                signMessage.signMessage({ message: String(SIGN_MESSAGE) })
        }
        dispatch(updateAssetState(asset))
    }, [balance, approve])

    const loginState = useAppSelector(getLoginState)

    const signMessage = useSignMessage({
        onSuccess: (data, variables) => {
            const address = verifyMessage(variables.message, data)
            console.log(address)
            login({
                walletAddress: address,
                signature: String(data),
            })
        },
        onError(error) {
            disconnect()
        },
    })

    const account = useAccount({
        onConnect: (data) => {
            if (!loginState && !data.isReconnected && !reConnect) {
                signMessage?.signMessage &&
                    signMessage.signMessage({ message: String(SIGN_MESSAGE) })
            }
            if (reConnect) {
                localStorage.setItem(RECONNECT_WALLET, 'SUCCESS')
                window.location.reload()
            }
            if (data.address !== address) {
                setAddress(data.address)
                refetchBalance()
                refetchAllowance()
            }
        },
        onDisconnect: () => {
            setReConnect(true)
        },
    })

    return <div></div>
}
