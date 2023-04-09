import { UserAPI } from '@/api/api-path'
import useAPI from '@/api/hooks/useAPI'
import LoadingScreen from '@/components/core/animate/loading-screen'
import Button from '@/components/core/button'
import Input from '@/components/core/input'
import { useAppDispatch } from '@/hooks'
import useOutsideClick from '@/hooks/useOutSideClick'
import { updateLoadingState } from '@/store/course'
import { updateLoginState } from '@/store/user'
import useWeb3 from '@/wallet/hooks/useWeb3'
import {
    faBell,
    faCartShopping,
    faChalkboardTeacher,
    faGear,
    faGraduationCap,
    faRightFromBracket,
    faUser,
    faWallet,
} from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { noop } from 'lodash'
import Router from 'next/router'
import { useEffect, useRef, useState } from 'react'

const Account = (props: any) => {
    const [hoverUser, setHoverUser] = useState(false)
    const [hoverUserActions, setHoverUserActions] = useState(false)
    const [hoverWallet, setHoverWallet] = useState(false)
    const [hoverWalletActions, setHoverWalletActions] = useState(false)
    const [isOpenWalletModal, setIsOpenWalletModal] = useState(false)
    const [myAccountBalance, setMyAccountBalance] = useState(0)
    const [isValidWalletInput, setIsValidWalletInput] = useState(true)
    const [walletInputErrorMessage, setWalletInputErrorMessage] = useState('')
    const [input, setInput] = useState('')
    const { disconnect } = useWeb3()

    const dispatch = useAppDispatch()

    const goToLearnerPage = () => {
        dispatch(updateLoadingState(true))
        Router.push('/learner/courses')
    }

    const goToInstructorPage = () => {
        dispatch(updateLoadingState(true))
        Router.push('/instructor/courses')
    }

    const logOut = async () => {
        await disconnect()
        localStorage.clear()
        dispatch(updateLoginState(false))
    }

    // const { mutate: claimDailyReward, isLoading: isLoadingClaimDailyReward } = useAPI.post(
    //     UserAPI.CLAIM_TODAY_REWARD,
    //     {
    //         onError: noop,
    //         onSuccess: (response) => {
    //         },
    //     },
    // )

    const { mutate: getMyBalance, isLoading: isLoadingGetMyBalance } =
        useAPI.getMutation(UserAPI.GET_MY_BALANCE, {
            onError: noop,
            onSuccess: (response) => {
                // setMyAccountBalance(response.balance)
                setMyAccountBalance(3)
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

    const handleClaimToken = () => {
        if (validateInput(input)) {
            console.log('Claim Token')
        }
    }

    useEffect(() => {
        getMyBalance({})
    }, [])

    return (
        <>
            <LoadingScreen isLoading={isLoadingGetMyBalance} />
            <div className="relative flex items-center justify-between space-x-10">
                {/* <FontAwesomeIcon
                icon={faBell}
                className={`text-[25px] cursor-pointer under_lg:hidden ${
                    !props.darkTheme ? 'text-black' : 'text-white'
                }`}
            /> */}
                <div className="flex">
                    <FontAwesomeIcon
                        icon={faWallet}
                        className={`text-[25px] cursor-pointer under_lg:hidden ${
                            !props.darkTheme ? 'text-black' : 'text-white'
                        }`}
                        onMouseEnter={() => setHoverWallet(true)}
                        onMouseLeave={() => setHoverWallet(false)}
                    />
                    <div className="under_xl:hidden ml-5">
                        {myAccountBalance} ABC
                    </div>
                    <div
                        onClick={() => setIsOpenWalletModal(true)}
                        className={`w-[270px] absolute z-30 right-0 ${
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
                            <Button className="btn-primary mt-3 w-full">
                                <div
                                    className="font-medium w-full text-center"
                                    onClick={() => handleClaimToken()}
                                >
                                    Claim token
                                </div>
                            </Button>
                        </div>
                    </div>
                </div>
                <FontAwesomeIcon
                    icon={faCartShopping}
                    className={`text-[25px] cursor-pointer under_lg:hidden ${
                        !props.darkTheme ? 'text-black' : 'text-white'
                    }`}
                />
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
                                // onClick={() => onSelectRating(item)}
                            >
                                <FontAwesomeIcon
                                    icon={faUser}
                                    className="w-[16px]"
                                />
                                <div>Profile</div>
                            </div>
                            <div className="flex items-center space-x-3 hover:bg-primary hover:text-white text-black box-border px-[20px] py-3 cursor-pointer hidden under_lg:flex">
                                <FontAwesomeIcon
                                    icon={faBell}
                                    className="w-[16px]"
                                />
                                <div>Notification</div>
                            </div>
                            <div className="flex items-center space-x-3 hover:bg-primary hover:text-white text-black box-border px-[20px] py-3 cursor-pointer hidden under_lg:flex">
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
                            <div
                                className="flex items-center space-x-3 hover:bg-primary hover:text-white text-black box-border px-[20px] py-3 cursor-pointer"
                                // onClick={() => onSelectRating(item)}
                            >
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
