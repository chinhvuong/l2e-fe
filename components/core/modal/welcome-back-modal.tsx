import React, { useEffect, useState } from 'react'
import Button from '../button'
import { useAppDispatch } from '@/hooks'
import { updateClaimDailyState } from '@/store/user'

interface IWelcomeBackModalProps {
    isShow: boolean
}

export default function WelcomeBackModal(props: IWelcomeBackModalProps) {
    const { isShow } = props
    const dispatch = useAppDispatch()
    const [showModal, setShowModal] = useState(isShow)

    useEffect(() => {
        setShowModal(isShow)
    }, [isShow])

    const handleShowModal = (value: boolean) => {
        setShowModal(value)
        dispatch(updateClaimDailyState(value))
    }

    return (
        <>
            {showModal ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-40 outline-none focus:outline-none">
                        <div className="relative">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full overflow-x-hidden bg-white outline-none focus:outline-none">
                                <div className="relative">
                                    <img
                                        src="/images/welcome_back.png"
                                        alt=""
                                    />
                                    <div className="absolute z-50 top-44 w-full">
                                        <div className="text-center text-2xl font-bold pr-3">
                                            Welcome back!
                                        </div>
                                        <div className="text-center text-md pr-3 pt-3">
                                            Claim your daily reward and ready to
                                            learn and teach knowledge!
                                        </div>
                                        <div className="flex justify-center mt-7 pr-3">
                                            <Button
                                                className="btn-primary"
                                                onClick={() =>
                                                    handleShowModal(false)
                                                }
                                            >
                                                <div className="font-medium text-center">
                                                    Close
                                                </div>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-700 bg-opacity-50 fixed inset-0 z-30"></div>
                </>
            ) : null}
        </>
    )
}
