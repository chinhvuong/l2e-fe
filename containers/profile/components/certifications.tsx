import Button from '@/components/core/button'
import CertificateModal from '@/components/core/modal/certification-modal'
import { useAppSelector } from '@/hooks'
import { getCertifications } from '@/store/certification/selectors'
import { Certificate } from '@/store/certification/types'
import { useState } from 'react'
import { useUpdateProfileContext } from '../update-profile-context'

export default function CertificationsList() {
    const { certificationsList } = useUpdateProfileContext()
    const [isShowCertificate, setShowCertification] = useState(false)
    const [selectedCertification, setSelectedCertification] =
        useState<Certificate>()
    function handleChosenCertification(certification: Certificate) {
        setShowCertification(!isShowCertificate)
        setSelectedCertification(certification)
    }
    return (
        <div>
            {certificationsList?.map((certification, index) => (
                <div
                    key={index}
                    onClick={() => handleChosenCertification(certification)}
                >
                    <img
                        src={
                            'https://marketplace.canva.com/EAFIEvneNCM/1/0/1600w/canva-golden-elegant-certificate-of-appreciation-0bN-aLORS9U.jpg'
                        }
                        alt=""
                        className="w-4/5 p-1 m-1"
                    />
                </div>
            ))}
            <CertificateModal
                isShow={isShowCertificate}
                setIsShow={setShowCertification}
                certificate={selectedCertification as Certificate}
            />
        </div>
    )
}
