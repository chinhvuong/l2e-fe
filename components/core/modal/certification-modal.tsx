import { Certificate } from '@/store/certification/types'
import React, { useEffect, useState } from 'react'
import Button from '../button'
import { useSigner } from 'wagmi'
import { sepolia } from '@/wallet/chains'
import { callAPI } from '@/api/axios-client'
import { UserAPI } from '@/api/api-path'
import { claimCertificate } from '@/hooks/coursedex'
import { ethers } from 'ethers'
import Loading from '../animate/loading'

interface ICertificateModalProps {
    isShow: boolean
    setIsShow: React.Dispatch<React.SetStateAction<boolean>>
    certificate: Certificate
}

export default function CertificateModal(props: ICertificateModalProps) {
    const { data: signer } = useSigner({
        chainId: sepolia.id,
    })
    const { isShow, setIsShow, certificate } = props
    const [showModal, setShowModal] = useState(isShow)
    const [isdisabled, setIsDisabled] = useState(false)
    const [isLoadingMintCertificate, setIsLoadingMintCertificate] =
        useState(false)
    useEffect(() => {
        setShowModal(isShow)
    }, [isShow])
    const handleShowModal = (value: boolean) => {
        setShowModal(value)
        setIsShow(value)
    }
    const handleClaimCertificate = async () => {
        try {
            setIsDisabled(true)
            setIsLoadingMintCertificate(true)
            const payload = await callAPI('post', UserAPI.CLAIM_CERTIFICATE, {
                courseId: certificate.courseId,
            })
            await claimCertificate(signer as ethers.Signer, payload)
            setIsLoadingMintCertificate(false)
        } catch (error) {
            setIsDisabled(false)
            setIsLoadingMintCertificate(false)
        }
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
                                            certificate.image ??
                                            '/images/placeholder.jpeg'
                                        }
                                        alt=""
                                        className="w-f p-1 m-1"
                                    />
                                    <div className="flex space-x-5 mt-7">
                                        {certificate.status === 'OFF_CHAIN' ? (
                                            <Button
                                                onClick={() =>
                                                    handleClaimCertificate()
                                                }
                                                disabled={isdisabled}
                                            >
                                                <div className="font-medium w-full text-center">
                                                    Mint Certificate
                                                </div>
                                                {isLoadingMintCertificate && (
                                                    <Loading className="!text-white ml-2" />
                                                )}
                                            </Button>
                                        ) : (
                                            <div>
                                                {certificate.status ===
                                                    'ON_CHAIN' &&
                                                    `This certification is already on
                                                chain`}
                                            </div>
                                        )}
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
