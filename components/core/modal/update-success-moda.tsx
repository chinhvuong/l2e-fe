import React, { useEffect, useState } from 'react'
import Button from '../button'

interface IWelcomeBackModalProps {
    isShow: boolean
    setIsShow: React.Dispatch<React.SetStateAction<boolean>>
    userRequest: string
}

export default function UpdateReviewsModal(props: IWelcomeBackModalProps) {
    const handleShowModal = (value: boolean) => {
        props.setIsShow(value)
    }

    return (
        <>
            {props.isShow ? (
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
                                            Request {props.userRequest}{' '}
                                            Successfully.
                                        </div>
                                        <div className="text-center text-md pr-3 pt-3">
                                            Your reivews will be{' '}
                                            {props.userRequest.toLowerCase()}d
                                            after few minutes.
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
