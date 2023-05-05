import LoadingScreen from '@/components/core/animate/loading-screen'
import CertificateCard from '@/components/core/certificate-card'
import Divider from '@/components/core/divider'
import CertificateModal from '@/components/core/modal/certification-modal'
import useHideFirstEnterLoadingScreen from '@/hooks/useHideFirstEnterLoadingScreen'
import { Certificate } from '@/store/certification/types'
import { useState } from 'react'
import { useUpdateProfileContext } from '../update-profile-context'

export default function CertificationsList() {
    const { certificationsList, isLoading } = useUpdateProfileContext()
    const [isShowCertificate, setShowCertification] = useState(false)
    const [selectedCertification, setSelectedCertification] =
        useState<Certificate>()

    const handleChosenCertification = (certification: Certificate) => {
        setShowCertification(!isShowCertificate)
        setSelectedCertification(certification)
    }

    useHideFirstEnterLoadingScreen()

    return (
        <>
            <LoadingScreen isLoading={isLoading} />
            <div className="h-full pt-9 px-[3.5rem]">
                <div className="font-semibold text-[30px] px-4">
                    Certificates
                </div>
                <div className="mt-10">
                    {certificationsList?.map((certification, index) => (
                        <div
                            key={index}
                            onClick={() =>
                                handleChosenCertification(certification)
                            }
                            className={`${
                                index === certificationsList.length - 1 &&
                                'pb-6'
                            }`}
                        >
                            <CertificateCard
                                key={certification._id}
                                data={certification}
                            />
                            {index !== certificationsList.length - 1 && (
                                <Divider />
                            )}
                        </div>
                    ))}
                    <CertificateModal
                        isShow={isShowCertificate}
                        setIsShow={setShowCertification}
                        certificate={selectedCertification as Certificate}
                    />
                </div>
            </div>
        </>
    )
}
