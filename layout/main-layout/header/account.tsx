import { useAppDispatch } from '@/hooks'
import { updateLoadingState } from '@/store/course'
import { updateLoginState } from '@/store/user'
import useWeb3 from '@/wallet/hooks/useWeb3'
import {
    faCalendar,
    faCalendarCheck,
} from '@fortawesome/free-regular-svg-icons'
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
import Router from 'next/router'
import { useState } from 'react'

const Account = (props: any) => {
    const [hoverUser, setHoverUser] = useState(false)
    const [hoverUserActions, setHoverUserActions] = useState(false)
    const [isDailyAttendance, setIsDailyAttendance] = useState(false)
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

    return (
        <div className="relative flex items-center justify-between lg:w-[150px] space-x-10">
            <FontAwesomeIcon
                icon={faBell}
                className={`text-[25px] cursor-pointer under_lg:hidden ${
                    !props.darkTheme ? 'text-black' : 'text-white'
                }`}
            />
            <FontAwesomeIcon
                icon={faWallet}
                className={`text-[25px] under_2xl:mx-7 cursor-pointer under_lg:hidden ${
                    !props.darkTheme ? 'text-black' : 'text-white'
                }`}
            />
            {isDailyAttendance ? (
                <FontAwesomeIcon
                    icon={faCalendarCheck}
                    className={`text-[25px] mb-0.5 under_2xl:mx-7 cursor-pointer under_lg:hidden ${
                        !props.darkTheme ? 'text-black' : 'text-white'
                    }`}
                />
            ) : (
                <FontAwesomeIcon
                    icon={faCalendar}
                    className={`text-[25px] mb-0.5 under_2xl:mx-7 cursor-pointer under_lg:hidden ${
                        !props.darkTheme ? 'text-black' : 'text-white'
                    }`}
                />
            )}
            <div className="relative">
                <img
                    src="https://cdn.wallpapersafari.com/21/24/pELVjk.jpg"
                    alt=""
                    className="rounded-full h-[35px] w-[35px] under_lg:mx-0 cursor-pointer"
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
    )
}

export default Account
