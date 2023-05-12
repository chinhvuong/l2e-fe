import { usdtAbi } from '@/abi/usdt'
import { AuthAPI } from '@/api/api-path'
import { AuthResponse } from '@/api/dto/auth.dto'
import useAPI from '@/api/hooks/useAPI'
import { SIGN_MESSAGE } from '@/constants'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants/localStorage'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { updateAssetState, updateLoginState } from '@/store/user'
import { getLoginState } from '@/store/user/selectors'
import { verifyMessage } from 'ethers/lib/utils'
import { noop } from 'lodash'
import { useEffect, useState } from 'react'
import { useAccount, useContractRead, useSignMessage } from 'wagmi'
import './style.scss'
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
        const asset: any = {}
        if (balance) {
            asset.balance = Number(balance)
        }
        if (approve) {
            asset.approve = Number(approve)
        }
        dispatch(updateAssetState(asset))
    }, [balance, approve])

    const loginState = useAppSelector(getLoginState)

    const signMessage = useSignMessage({
        onSuccess: (data, variables) => {
            const address = verifyMessage(variables.message, data)
            login({
                walletAddress: address,
                signature: String(data),
            })
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
        onDisconnect: noop,
    })

    return <div></div>
}
