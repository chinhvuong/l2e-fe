import { UserAPI } from '@/api/api-path'
import { callAPI } from '@/api/axios-client'
import useAPI from '@/api/hooks/useAPI'
import Loading from '@/components/core/animate/loading'
import Button from '@/components/core/button'
import Input from '@/components/core/input'
import { ACCESS_TOKEN } from '@/constants/localStorage'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { claimReward } from '@/hooks/coursedex'
import {
    updateClaimDailyState,
    updateGlobalLoadingState,
    updateLoginState,
    updateTokenBalance,
} from '@/store/user'
import { getLoginState, getTokenBalanceState } from '@/store/user/selectors'
import { sepolia } from '@/wallet/chains'
import useWeb3 from '@/wallet/hooks/useWeb3'
import {
    faBell,
    faChalkboardTeacher,
    faGear,
    faGraduationCap,
    faRightFromBracket,
    faUser,
    faWallet,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ethers } from 'ethers'
import { noop } from 'lodash'
import Router from 'next/router'
import { useEffect, useState } from 'react'
import { useSigner } from 'wagmi'

const Account = (props: any) => {
    const [hoverUser, setHoverUser] = useState(false)
    const [hoverUserActions, setHoverUserActions] = useState(false)
    const [hoverWallet, setHoverWallet] = useState(false)
    const [hoverWalletActions, setHoverWalletActions] = useState(false)
    const [isValidWalletInput, setIsValidWalletInput] = useState(true)
    const [walletInputErrorMessage, setWalletInputErrorMessage] = useState('')
    const [input, setInput] = useState('')
    const [isLoadingClaimToken, setIsLoadingClaimToken] = useState(false)
    const { disconnect } = useWeb3()
    const { data: signer } = useSigner({
        chainId: sepolia.id,
    })
    const [disabled, setDisabled] = useState(false)
    const myAccountBalance = useAppSelector(getTokenBalanceState)
    const loginState = useAppSelector(getLoginState)

    const dispatch = useAppDispatch()

    const goToLearnerPage = () => {
        Router.push('/learner/courses')
    }

    const goToInstructorPage = () => {
        Router.push('/instructor/courses')
    }

    const goToProfilePage = () => {
        Router.push('/profile/detail')
    }

    const logOut = async () => {
        await disconnect()
        localStorage.clear()
        dispatch(updateLoginState(false))
    }
    const { mutate: getMyBalance, isLoading: isLoadingGetMyBalance } =
        useAPI.getMutation(UserAPI.GET_MY_BALANCE, {
            onError: noop,
            onSuccess: (response) => {
                dispatch(updateTokenBalance(response.balance))
            },
        })
    const { mutate: claimDailyReward, isLoading: isLoadingClaimDailyReward } =
        useAPI.post(UserAPI.CLAIM_TODAY_REWARD, {
            onError: noop,
            onSuccess: (response) => {
                dispatch(updateClaimDailyState(response.success))
                getMyBalance({})
            },
        })
    const validateInput = (value: string): boolean => {
        if (value === '') {
            setWalletInputErrorMessage('This field is required!')
            setIsValidWalletInput(false)
            return false
        } else if (parseInt(value) > myAccountBalance) {
            setWalletInputErrorMessage('The amount exceeds your balance!')
            setIsValidWalletInput(false)
            return false
        } else {
            setWalletInputErrorMessage('')
            setIsValidWalletInput(true)
            return true
        }
    }

    const handleClaimToken = async () => {
        if (validateInput(input)) {
            try {
                setDisabled(true)
                setIsLoadingClaimToken(true)
                const payload = await callAPI('post', UserAPI.CLAIM_TOKEN, {
                    amount: parseInt(input),
                })
                await claimReward(signer as ethers.Signer, payload)
                setIsLoadingClaimToken(false)
                getMyBalance({})
                setDisabled(false)
            } catch (error) {
                setDisabled(false)
                setIsLoadingClaimToken(false)
            }
        }
    }

    useEffect(() => {
        if (localStorage.getItem(ACCESS_TOKEN)) {
            claimDailyReward({})
        }
    }, [loginState])

    const setListener = (ethereum: any) => {
        ethereum.on('chainChanged', pageReload)
    }
    const removeListener = (ethereum: any) => {
        ethereum.removeListener('chainChanged', pageReload)
    }
    const changetoSepoliNetworks = async (ethereum: any) => {
        try {
            await ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: ethers.utils.hexlify(sepolia.id) }],
            })
        } catch (error) {
            logOut()
        }
    }
    function pageReload() {
        window.location.reload()
    }
    useEffect(() => {
        async function initWeb3() {
            try {
                setListener(window.ethereum)
                changetoSepoliNetworks(window.ethereum)
                // then add logic here
            } catch (error: any) {
                console.log(error)
            }
        }
        initWeb3()
        return () => removeListener(window.ethereum)
    }, [])
    useEffect(() => {
        dispatch(
            updateGlobalLoadingState(
                isLoadingGetMyBalance ||
                    isLoadingClaimDailyReward ||
                    isLoadingClaimToken,
            ),
        )
    }, [isLoadingGetMyBalance, isLoadingClaimDailyReward, isLoadingClaimToken])

    return (
        <>
            <div className="relative flex items-center justify-between space-x-10">
                <div className="flex cursor-pointer">
                    <FontAwesomeIcon
                        icon={faWallet}
                        className={`text-[25px] under_lg:hidden ${
                            !props.darkTheme ? 'text-black' : 'text-white'
                        }`}
                        onMouseEnter={() => setHoverWallet(true)}
                        onMouseLeave={() => setHoverWallet(false)}
                    />
                    <div className="under_xl:hidden ml-5">
                        {myAccountBalance} ABC
                    </div>
                    <div
                        className={`w-[270px] absolute z-30 right-10 ${
                            !(hoverWallet || hoverWalletActions) && 'hidden'
                        }`}
                        onMouseEnter={() => setHoverWalletActions(true)}
                        onMouseLeave={() => setHoverWalletActions(false)}
                    >
                        <div className="p-5"></div>
                        <div className="rounded-[20px] bg-white drop-shadow-lg w-full p-5">
                            <div className="text-black text-xs mb-3 text-center">
                                Type the amount you want to claim
                            </div>
                            <div className="w-full bg-white rounded-[80px] text-black">
                                <Input
                                    id={'currencyInput'}
                                    placeholder="0"
                                    type="number"
                                    min="0"
                                    max={`${myAccountBalance}`}
                                    updateInput={(value: string) => {
                                        setInput(value)
                                        validateInput(value)
                                    }}
                                />
                            </div>
                            {!isValidWalletInput && (
                                <div className="text-red-500 text-xs pl-3 pt-1">
                                    {walletInputErrorMessage}
                                </div>
                            )}
                            <Button
                                className="btn-primary mt-3 w-full"
                                disabled={disabled}
                                onClick={() => handleClaimToken()}
                            >
                                <div className="font-medium w-full text-center">
                                    Claim token
                                </div>
                                {isLoadingClaimToken && (
                                    <Loading className="!text-white" />
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="relative">
                    <img
                        src="https://cdn.wallpapersafari.com/21/24/pELVjk.jpg"
                        alt=""
                        className="rounded-full h-[35px] w-[35px] cursor-pointer"
                        onMouseEnter={() => setHoverUser(true)}
                        onMouseLeave={() => setHoverUser(false)}
                    />
                    <div
                        onMouseEnter={() => setHoverUserActions(true)}
                        onMouseLeave={() => setHoverUserActions(false)}
                        className={`w-[150px] absolute right-0 z-30 ${
                            !(hoverUser || hoverUserActions) && 'hidden'
                        }`}
                    >
                        <div className="h-[15px]"></div>
                        <div
                            className={`rounded-[20px] bg-white drop-shadow-lg w-full `}
                        >
                            <div
                                className="flex items-center space-x-3 hover:bg-primary hover:text-white text-black box-border px-[20px] py-3 rounded-t-[20px] cursor-pointer"
                                onClick={() => goToProfilePage()}
                            >
                                <FontAwesomeIcon
                                    icon={faUser}
                                    className="w-[14px]"
                                />
                                <div>Profile</div>
                            </div>
                            <div className="flex items-center space-x-3 hover:bg-primary hover:text-white text-black box-border px-[20px] py-3 cursor-pointer under_lg:flex">
                                <FontAwesomeIcon
                                    icon={faBell}
                                    className="w-[16px]"
                                />
                                <div>Notification</div>
                            </div>
                            <div className="flex items-center space-x-3 hover:bg-primary hover:text-white text-black box-border px-[20px] py-3 cursor-pointer under_lg:flex">
                                <FontAwesomeIcon
                                    icon={faWallet}
                                    className="w-[16px]"
                                />
                                <div>Wallet</div>
                            </div>
                            <div
                                className="flex items-center space-x-3 hover:bg-primary hover:text-white text-black box-border px-[20px] py-3 cursor-pointer"
                                onClick={() => goToLearnerPage()}
                            >
                                <FontAwesomeIcon
                                    icon={faGraduationCap}
                                    className="w-[16px]"
                                />
                                <div>Learner</div>
                            </div>
                            <div
                                className="flex items-center space-x-3 hover:bg-primary hover:text-white text-black box-border px-[20px] py-3 cursor-pointer"
                                onClick={() => goToInstructorPage()}
                            >
                                <FontAwesomeIcon
                                    icon={faChalkboardTeacher}
                                    className="w-[16px]"
                                />
                                <div>Instructor</div>
                            </div>
                            <div className="flex items-center space-x-3 hover:bg-primary hover:text-white text-black box-border px-[20px] py-3 cursor-pointer">
                                <FontAwesomeIcon
                                    icon={faGear}
                                    className="w-[16px]"
                                />
                                <div>Settings</div>
                            </div>
                            <div
                                className="flex items-center space-x-3 hover:bg-primary hover:text-white text-black box-border px-[20px] py-3 rounded-b-[20px] cursor-pointer"
                                onClick={logOut}
                            >
                                <FontAwesomeIcon
                                    icon={faRightFromBracket}
                                    className="ml-[1px]"
                                />
                                <div>Log Out</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Account
