import { faCircleXmark } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import Button from '../button'

interface IDeleteConfirmModalProps {
    isShow: boolean
    setIsShow: React.Dispatch<React.SetStateAction<boolean>>
    deleteAction: () => void
}

export default function DeleteConfirmModal(props: IDeleteConfirmModalProps) {
    const { isShow, setIsShow, deleteAction } = props

    const [showModal, setShowModal] = useState(isShow)

    useEffect(() => {
        setShowModal(isShow)
    }, [isShow])

    const handleShowModal = (value: boolean) => {
        setShowModal(value)
        setIsShow(value)
    }

    return (
        <>
            {showModal ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="flex flex-col items-center justify-between py-10 px-20 w-[500px]">
                                    <FontAwesomeIcon
                                        icon={faCircleXmark}
                                        className="text-5xl text-red-500"
                                    />
                                    <div className="text-2xl font-bold mt-7 mb-2">
                                        Are you sure?
                                    </div>
                                    <div className="text-center">
                                        {`Do you really want to delete this record? This action can't be revert!`}
                                    </div>
                                    <div className="flex space-x-5 mt-7">
                                        <Button
                                            outline
                                            onClick={() =>
                                                handleShowModal(false)
                                            }
                                        >
                                            <div className="font-medium">
                                                Cancel
                                            </div>
                                        </Button>
                                        <Button onClick={() => deleteAction()}>
                                            <div className="font-medium">
                                                Delete
                                            </div>
                                        </Button>
                                    </div>
                                </div>
                                <div
                                    className="absolute top-5 right-5 cursor-pointer"
                                    onClick={() => handleShowModal(false)}
                                >
                                    ✕
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
