import { Certificate } from '@/store/certification/types'
import React, { useEffect, useState } from 'react'
import Button from '../button'

interface ICertificateModalProps {
    isShow: boolean
    setIsShow: React.Dispatch<React.SetStateAction<boolean>>
    certificate: Certificate
}

export default function CertificateModal(props: ICertificateModalProps) {
    const { isShow, setIsShow, certificate } = props
    const [showModal, setShowModal] = useState(isShow)
    useEffect(() => {
        console.log(isShow)
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
                                <div className="flex flex-col items-center justify-between py-10 px-20 w-[700px]">
                                    <img
                                        src={
                                            'https://marketplace.canva.com/EAFIEvneNCM/1/0/1600w/canva-golden-elegant-certificate-of-appreciation-0bN-aLORS9U.jpg'
                                        }
                                        alt=""
                                        className="w-f p-1 m-1"
                                    />
                                    <div className="flex space-x-5 mt-7">
                                        <Button
                                            outline
                                            onClick={() =>
                                                handleShowModal(false)
                                            }
                                        >
                                            <div className="font-medium">
                                                Cancel Mint Certification
                                            </div>
                                        </Button>
                                        {certificate.status === 'OFF_CHAIN' ? (
                                            <Button>
                                                <div className="font-medium">
                                                    Mint Certificate
                                                </div>
                                            </Button>
                                        ) : (
                                            <div>
                                                This certification is already on
                                                chain
                                            </div>
                                        )}
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
