import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

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
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="flex flex-col items-center justify-between py-10 px-20 w-[500px]">
                                    <FontAwesomeIcon
                                        icon={faCircleCheck}
                                        className="text-5xl text-green-500"
                                    />
                                    <div className="text-xl text-center font-bold mt-5 mb-2">
                                        {`${props.userRequest} the review successfully!`}
                                    </div>
                                    <div className="text-sm text-center">
                                        {`Your review will be ${props.userRequest.toLowerCase()}d as soon as possible.`}
                                    </div>
                                </div>
                                <div
                                    className="absolute top-5 right-5 cursor-pointer bg-gray-300 px-2 rounded-full"
                                    onClick={() => handleShowModal(false)}
                                >
                                    x
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-700 bg-opacity-50 fixed inset-0 z-40"></div>
                </>
            ) : null}
        </>
    )
}
