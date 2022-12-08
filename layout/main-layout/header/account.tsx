import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import {
    faBars,
    faBell,
    faUser,
    faGear,
    faRightFromBracket,
    faWallet,
    faGraduationCap,
    faChalkboardTeacher,
} from '@fortawesome/free-solid-svg-icons'
import { WalletAccount } from '@/wallet/ui'
import { useAppDispatch, useAppSelector } from '@/hooks'
import Router from 'next/router'
import useWeb3 from '@/wallet/hooks/useWeb3'
import { getLoginState } from '@/store/user/selectors'
import { updateLoginState } from '@/store/user'

const Account = (props: any) => {
    const [hoverUser, setHoverUser] = useState(false)
    const [hoverUserActions, setHoverUserActions] = useState(false)
    const { disconnect } = useWeb3()

    const loginState = useAppSelector(getLoginState)
    const dispatch = useAppDispatch()

    const goToLearnerPage = () => {
        Router.push('/learner')
    }

    const goToInstructorPage = () => {
        Router.push('/instructor')
    }

    const logOut = async () => {
        await disconnect()
        localStorage.clear()
        dispatch(updateLoginState(false))
    }
    return (
        <div className="flex items-center justify-between sm:hidden lg:w-[150px] under_lg:hidden">
            <FontAwesomeIcon
                icon={faBell}
                className={`text-[25px] cursor-pointer ${
                    !props.darkTheme ? 'text-black' : 'text-white'
                }`}
            />
            <div className="relative">
                <img
                    src="https://cdn.wallpapersafari.com/21/24/pELVjk.jpg"
                    alt=""
                    className="rounded-full h-[35px] w-[35px] mx-[35px] cursor-pointer"
                    onMouseEnter={() => setHoverUser(true)}
                    onMouseLeave={() => setHoverUser(false)}
                />
                <div
                    onMouseEnter={() => setHoverUserActions(true)}
                    onMouseLeave={() => setHoverUserActions(false)}
                    className={`w-[150px] absolute right-[20px] z-30 w-full ${
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
            <FontAwesomeIcon
                icon={faWallet}
                className={`text-[25px] cursor-pointer ${
                    !props.darkTheme ? 'text-black' : 'text-white'
                }`}
            />
        </div>
    )
}

export default Account
